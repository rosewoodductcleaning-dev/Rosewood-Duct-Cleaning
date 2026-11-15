import { useLayoutEffect } from 'react';

interface SavedBodyStyles {
  scrollX: number;
  scrollY: number;
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyLeft: string;
  bodyRight: string;
  bodyWidth: string;
  bodyPaddingRight: string;
  bodyOverscrollBehavior: string;
  htmlOverflow: string;
  htmlOverscrollBehavior: string;
}

const activeLocks = new Set<symbol>();
let savedStyles: SavedBodyStyles | null = null;
let lastTouchY = 0;

function findScrollableAncestor(target: EventTarget | null): HTMLElement | null {
  let el = target instanceof HTMLElement ? target : null;
  while (el && el !== document.body && el !== document.documentElement) {
    const style = window.getComputedStyle(el);
    const overflowY = style.overflowY;
    const isScrollableStyle = overflowY === 'auto' || overflowY === 'scroll';
    if (isScrollableStyle && el.scrollHeight > el.clientHeight + 1) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

function handleTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    lastTouchY = e.touches[0].clientY;
  }
}

function handleTouchMove(e: TouchEvent) {
  if (activeLocks.size === 0) return;

  // Allow pinch-to-zoom gestures
  if (e.touches.length > 1) return;

  const scrollable = findScrollableAncestor(e.target);
  if (!scrollable) {
    if (e.cancelable) {
      e.preventDefault();
    }
    return;
  }

  const currentY = e.touches[0].clientY;
  const deltaY = currentY - lastTouchY;
  lastTouchY = currentY;

  const atTop = scrollable.scrollTop <= 0;
  const atBottom =
    scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

  // Prevent scroll chaining to background when at top/bottom boundary of the popup
  if ((deltaY > 0 && atTop) || (deltaY < 0 && atBottom)) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }
}

export function lockScroll(lockId: symbol): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (activeLocks.has(lockId)) return;

  const wasUnlocked = activeLocks.size === 0;
  activeLocks.add(lockId);

  if (!wasUnlocked) return;

  const html = document.documentElement;
  const body = document.body;

  const scrollY = window.scrollY ?? window.pageYOffset ?? html.scrollTop ?? 0;
  const scrollX = window.scrollX ?? window.pageXOffset ?? html.scrollLeft ?? 0;
  const scrollbarWidth = Math.max(0, window.innerWidth - html.clientWidth);

  savedStyles = {
    scrollX,
    scrollY,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyLeft: body.style.left,
    bodyRight: body.style.right,
    bodyWidth: body.style.width,
    bodyPaddingRight: body.style.paddingRight,
    bodyOverscrollBehavior: body.style.overscrollBehavior,
    htmlOverflow: html.style.overflow,
    htmlOverscrollBehavior: html.style.overscrollBehavior,
  };

  if (scrollbarWidth > 0) {
    const computedPaddingRight = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
  }

  html.style.overflow = 'hidden';
  html.style.overscrollBehavior = 'none';

  body.style.overflow = 'hidden';
  body.style.overscrollBehavior = 'none';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
}

export function unlockScroll(lockId: symbol): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!activeLocks.has(lockId)) return;

  activeLocks.delete(lockId);

  // Keep locked while another overlay/modal/menu is still open
  if (activeLocks.size > 0 || !savedStyles) return;

  const toRestore = savedStyles;
  savedStyles = null;

  document.removeEventListener('touchstart', handleTouchStart);
  document.removeEventListener('touchmove', handleTouchMove);

  const html = document.documentElement;
  const body = document.body;

  html.style.overflow = toRestore.htmlOverflow;
  html.style.overscrollBehavior = toRestore.htmlOverscrollBehavior;

  body.style.overflow = toRestore.bodyOverflow;
  body.style.position = toRestore.bodyPosition;
  body.style.top = toRestore.bodyTop;
  body.style.left = toRestore.bodyLeft;
  body.style.right = toRestore.bodyRight;
  body.style.width = toRestore.bodyWidth;
  body.style.paddingRight = toRestore.bodyPaddingRight;
  body.style.overscrollBehavior = toRestore.bodyOverscrollBehavior;

  // Restore exact previous scroll position instantly (bypassing html { scroll-behavior: smooth })
  const prevScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(toRestore.scrollX, toRestore.scrollY);
  html.style.scrollBehavior = prevScrollBehavior;
}

export function getActiveScrollLockCount(): number {
  return activeLocks.size;
}

export function useScrollLock(isLocked: boolean): void {
  useLayoutEffect(() => {
    if (!isLocked) return;
    const lockId = Symbol('scroll-lock');
    lockScroll(lockId);
    return () => {
      unlockScroll(lockId);
    };
  }, [isLocked]);
}
