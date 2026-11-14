import React, { useState, useMemo, useRef } from 'react';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { geoPath } from 'd3-geo';
import usStatesAtlas from 'us-atlas/states-albers-10m.json';
import {
  MapPin,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Instagram,
  Wind,
  Flame,
  Fan,
  Home,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Info,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { ServiceType } from '../types';
import {
  US_STATES,
  US_STATES_BY_FIPS,
  SMALL_LABEL_STATES,
  SERVICE_COVERAGE_CONFIG,
  getStateCoverage,
  checkZipCoverage,
  type USStateInfo,
  type ZipCoverageResult,
} from '../data/serviceCoverage';

interface ServiceCoverageMapProps {
  onBookNow: (service?: ServiceType, locationText?: string) => void;
}

interface StateGeometryFeature {
  id: string;
  pathD: string;
  centroid: [number, number] | null;
  info: USStateInfo;
}

const VIEWBOX_WIDTH = 1035;
const VIEWBOX_HEIGHT = 615;
const VIEWBOX_MIN_X = -65;
const VIEWBOX_MIN_Y = 5;

export const ServiceCoverageMap: React.FC<ServiceCoverageMapProps> = ({ onBookNow }) => {
  const [selectedFips, setSelectedFips] = useState<string | null>(null);
  const [hoveredFips, setHoveredFips] = useState<string | null>(null);

  // Map zoom & pan controls for comfortable mobile & Northeast inspection
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // ZIP code checker state
  const [zipInput, setZipInput] = useState('');
  const [zipError, setZipError] = useState<string | null>(null);
  const [zipResult, setZipResult] = useState<ZipCoverageResult | null>(null);

  // Precompute all 50 states (+ DC) SVG path geometries and interior borders from Census TopoJSON
  const { stateFeatures, innerBordersPath } = useMemo(() => {
    const topology = usStatesAtlas as unknown as Topology<{
      states: GeometryCollection<{ name: string }>;
    }>;

    const geoCollection = feature(topology, topology.objects.states);
    const pathGenerator = geoPath();

    const features: StateGeometryFeature[] = [];
    for (const feat of geoCollection.features) {
      const fips = String(feat.id ?? '').padStart(2, '0');
      const stateInfo = US_STATES_BY_FIPS[fips];
      if (!stateInfo) continue;

      const d = pathGenerator(feat);
      if (!d) continue;

      const rawCentroid = pathGenerator.centroid(feat);
      const centroid: [number, number] | null =
        rawCentroid && Number.isFinite(rawCentroid[0]) && Number.isFinite(rawCentroid[1])
          ? [rawCentroid[0], rawCentroid[1]]
          : null;

      features.push({
        id: fips,
        pathD: d,
        centroid,
        info: stateInfo,
      });
    }

    const borders = mesh(topology, topology.objects.states, (a, b) => a !== b);
    const bordersD = pathGenerator(borders) ?? '';

    return {
      stateFeatures: features,
      innerBordersPath: bordersD,
    };
  }, []);

  const selectedState = selectedFips ? US_STATES_BY_FIPS[selectedFips] ?? null : null;
  const hoveredState = hoveredFips ? US_STATES_BY_FIPS[hoveredFips] ?? null : null;
  const selectedCoverage = selectedState ? getStateCoverage(selectedState) : null;

  const sortedStates = useMemo(
    () => [...US_STATES].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const hasConfiguredStates = SERVICE_COVERAGE_CONFIG.confirmedStates.length > 0;

  const handleZoomIn = () => {
    setZoom((z) => Math.min(2.6, Number((z + 0.4).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, Number((z - 0.4).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    // Do not hijack clicks on buttons/selects
    if ((e.target as HTMLElement).closest('button, select, input')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxPanX = 240 * (zoom - 1);
    const maxPanY = 150 * (zoom - 1);
    setPan({
      x: Math.max(-maxPanX, Math.min(maxPanX, dragStartRef.current.panX + dx)),
      y: Math.max(-maxPanY, Math.min(maxPanY, dragStartRef.current.panY + dy)),
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = zipInput.trim();

    if (!/^\d{5}$/.test(clean)) {
      setZipError('Please enter a valid 5-digit US ZIP code.');
      setZipResult(null);
      return;
    }

    setZipError(null);
    const result = checkZipCoverage(clean);
    setZipResult(result);

    // Sync the interactive map highlight if this ZIP corresponds to a US state
    if (result.matchedState) {
      setSelectedFips(result.matchedState.fips);
    }
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipInput(val);
    if (zipError) setZipError(null);
    if (zipResult) setZipResult(null);
  };

  const serviceIndicators: Array<{ title: ServiceType; subtitle: string; icon: React.ReactNode }> = [
    {
      title: 'Air Duct Cleaning',
      subtitle: 'Supply & return ventilation care',
      icon: <Wind className="w-5 h-5 text-[#D94D78]" />,
    },
    {
      title: 'Dryer Vent Cleaning',
      subtitle: 'Lint removal & airflow safety',
      icon: <Flame className="w-5 h-5 text-[#D94D78]" />,
    },
    {
      title: 'HVAC Cleaning',
      subtitle: 'Coils, blowers & unit cleaning',
      icon: <Fan className="w-5 h-5 text-[#D94D78]" />,
    },
    {
      title: 'Chimney Cleaning',
      subtitle: 'Flue, soot & creosote sweeping',
      icon: <Home className="w-5 h-5 text-[#D94D78]" />,
    },
  ];

  return (
    <section
      id="coverage"
      className="py-14 sm:py-20 lg:py-28 bg-[#F6F0E7] relative border-t border-[#75401F]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. SECTION HEADING */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#75401F] mb-2.5">
            <Compass className="w-4 h-4 text-[#D94D78] shrink-0" />
            <span>OUR SERVICE COVERAGE</span>
          </div>

          <h2
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-[#542B16] tracking-tight mb-3 sm:mb-4"
            style={{ textWrap: 'balance' }}
          >
            Serving Homes Across the USA
          </h2>

          <p className="text-xs sm:text-base text-[#352319]/85 leading-relaxed font-normal max-w-2xl mx-auto">
            Rosewood Duct Cleaning is committed to helping homeowners enjoy cleaner air and healthier indoor spaces. Explore our service coverage across the United States.
          </p>
        </div>

        {/* 2. INTERACTIVE USA MAP & STATE COVERAGE PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-8 sm:mb-10">
          
          {/* Left / Main Area: Interactive 50-State USA Map Container */}
          <div className="lg:col-span-8 bg-[#FFFDF9] rounded-3xl border border-[#75401F]/20 shadow-md p-4 sm:p-6 flex flex-col justify-between">
            
            {/* Map Header Bar: Legend + Hover Readout + Zoom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3 border-b border-[#75401F]/10">
              {/* Availability Legend (Icon + Text + Swatch) */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-semibold text-[#542B16]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#75401F] border border-[#542B16] inline-block shrink-0" />
                  <span>Confirmed Service Area</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#EFE3D2] border border-[#75401F]/40 inline-block shrink-0" />
                  <span>Requires Confirmation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-[#D94D78] border border-[#542B16] inline-block shrink-0" />
                  <span>Selected State</span>
                </div>
              </div>

              {/* Map Controls (Zoom & Reset) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 2.6}
                  aria-label="Zoom in map"
                  className="w-9 h-9 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] disabled:opacity-40 text-[#542B16] flex items-center justify-center border border-[#75401F]/15 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  aria-label="Zoom out map"
                  className="w-9 h-9 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] disabled:opacity-40 text-[#542B16] flex items-center justify-center border border-[#75401F]/15 transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  disabled={zoom === 1 && !selectedFips}
                  aria-label="Reset map view"
                  className="px-2.5 h-9 rounded-xl bg-[#F6F0E7] hover:bg-[#ebdccb] disabled:opacity-40 text-[#542B16] text-xs font-bold flex items-center gap-1 border border-[#75401F]/15 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Map Viewport */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={() => {
                handlePointerUp();
                setHoveredFips(null);
              }}
              className={`relative w-full rounded-2xl bg-[#FAF6F0] border border-[#75401F]/12 overflow-hidden select-none ${
                zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
              style={{ touchAction: 'manipulation pinch-zoom' }}
            >
              {/* Unobtrusive Live State Hover / Selection Bar inside Map Top-Left */}
              <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-2">
                {hoveredState ? (
                  <div className="px-3 py-1.5 rounded-xl bg-[#542B16]/95 text-[#FFFDF9] text-xs font-bold shadow-md flex items-center gap-2 backdrop-blur-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                    <span>{hoveredState.name} ({hoveredState.code})</span>
                    <span className="text-[#F6F0E7]/70 font-normal hidden sm:inline">
                      &bull; {SERVICE_COVERAGE_CONFIG.confirmedStates.includes(hoveredState.code) ? 'Confirmed' : 'Click to inspect'}
                    </span>
                  </div>
                ) : selectedState ? (
                  <div className="px-3 py-1.5 rounded-xl bg-[#D94D78] text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>Selected: {selectedState.name}</span>
                  </div>
                ) : (
                  <div className="px-3 py-1.5 rounded-xl bg-[#FFFDF9]/90 border border-[#75401F]/20 text-[#542B16] text-[11px] font-semibold shadow-xs">
                    Tap or click any state to view service details
                  </div>
                )}
              </div>

              {/* Actual 50-State Albers USA SVG Vector Map */}
              <div
                className="w-full transition-transform duration-200 ease-out origin-center"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <svg
                  viewBox={`${VIEWBOX_MIN_X} ${VIEWBOX_MIN_Y} ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
                  className="w-full h-auto block"
                  role="img"
                  aria-label="Interactive United States Service Coverage Map showing all 50 states"
                >
                  <title>Rosewood Duct Cleaning United States Service Coverage Map</title>

                  {/* State Polygons */}
                  <g>
                    {stateFeatures.map((feat) => {
                      const isSelected = selectedFips === feat.id;
                      const isHovered = hoveredFips === feat.id;
                      const isConfirmed = SERVICE_COVERAGE_CONFIG.confirmedStates.includes(feat.info.code);

                      let fillColor = '#EFE3D2'; // Cream-parchment for unconfigured / confirmation-required states
                      if (isConfirmed) fillColor = '#75401F';
                      if (isHovered && !isSelected) {
                        fillColor = isConfirmed ? '#542B16' : '#F3C9D6';
                      }
                      if (isSelected) fillColor = '#D94D78';

                      return (
                        <path
                          key={feat.id}
                          d={feat.pathD}
                          fill={fillColor}
                          stroke={isSelected ? '#542B16' : isHovered ? '#D94D78' : '#75401F'}
                          strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.85}
                          strokeLinejoin="round"
                          tabIndex={0}
                          role="button"
                          aria-label={`${feat.info.name} — ${
                            isConfirmed ? 'Confirmed service area' : 'Confirmation required'
                          }`}
                          aria-pressed={isSelected}
                          onMouseEnter={() => setHoveredFips(feat.id)}
                          onMouseLeave={() => setHoveredFips((prev) => (prev === feat.id ? null : prev))}
                          onClick={() => setSelectedFips(feat.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedFips(feat.id);
                            }
                          }}
                          className="cursor-pointer transition-colors duration-150 focus:outline-none"
                        />
                      );
                    })}
                  </g>

                  {/* Shared Crisp State Boundaries */}
                  <path
                    d={innerBordersPath}
                    fill="none"
                    stroke="#542B16"
                    strokeOpacity={0.35}
                    strokeWidth={0.75}
                    strokeLinejoin="round"
                    pointerEvents="none"
                  />

                  {/* Clean Two-Letter State Abbreviations on Interior Contiguous/AK/HI Polygons */}
                  <g pointerEvents="none">
                    {stateFeatures.map((feat) => {
                      if (!feat.centroid || SMALL_LABEL_STATES.has(feat.info.code)) return null;
                      const isSelected = selectedFips === feat.id;
                      const isConfirmed = SERVICE_COVERAGE_CONFIG.confirmedStates.includes(feat.info.code);

                      // Minor optical nudge for Michigan & Florida centroids so labels sit nicely in the landmass
                      let [cx, cy] = feat.centroid;
                      if (feat.info.code === 'MI') {
                        cx += 10;
                        cy += 12;
                      } else if (feat.info.code === 'FL') {
                        cx += 10;
                      } else if (feat.info.code === 'LA') {
                        cx -= 8;
                      } else if (feat.info.code === 'HI') {
                        cy += 14;
                      }

                      return (
                        <text
                          key={`label-${feat.id}`}
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={isSelected || isConfirmed ? '#FFFDF9' : '#542B16'}
                          fontSize="10"
                          fontWeight="800"
                          letterSpacing="0.04em"
                          className="font-sans select-none"
                          opacity={isSelected || isConfirmed ? 1 : 0.78}
                        >
                          {feat.info.code}
                        </text>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>

            {/* Subtle Footer Hint Below SVG */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#352319]/70">
              <span>All 50 US states &bull; Click or tap any state to inspect availability</span>
              {zoom > 1 && <span>Drag map to pan &bull; Zoom {Math.round(zoom * 100)}%</span>}
            </div>
          </div>

          {/* Right Panel: "Rosewood Service Coverage" State Interaction Card */}
          <div className="lg:col-span-4 bg-[#FFFDF9] rounded-3xl border border-[#75401F]/20 shadow-md p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Panel Heading */}
              <div className="pb-4 border-b border-[#75401F]/12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#75401F] block mb-1">
                  Interactive State Lookup
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#542B16] leading-tight">
                  Rosewood Service Coverage
                </h3>
              </div>

              {/* Accessible Quick State Dropdown (Ideal for Mobile & Small Northeast States) */}
              <div>
                <label
                  htmlFor="coverage-state-select"
                  className="block text-[11px] font-black uppercase tracking-wider text-[#542B16] mb-1.5"
                >
                  Select State Directly
                </label>
                <div className="relative">
                  <select
                    id="coverage-state-select"
                    value={selectedFips ?? ''}
                    onChange={(e) => setSelectedFips(e.target.value || null)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-[#FAF6F0] border border-[#75401F]/20 text-sm font-bold text-[#542B16] focus:outline-none focus:ring-2 focus:ring-[#D94D78] appearance-none cursor-pointer min-h-[46px]"
                  >
                    <option value="">Choose any US state (All 50 States)...</option>
                    {sortedStates.map((st) => (
                      <option key={st.fips} value={st.fips}>
                        {st.name} ({st.code})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#75401F]">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Selected State Info Display */}
              {selectedCoverage ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#75401F]/15 space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#75401F] block">
                        Selected State
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-black text-[#542B16] leading-tight">
                        {selectedCoverage.state.name}
                      </h4>
                    </div>
                    <span className="font-display font-black text-sm text-[#75401F] bg-[#FFFDF9] px-2.5 py-1 rounded-lg border border-[#75401F]/15 shrink-0">
                      {selectedCoverage.state.code}
                    </span>
                  </div>

                  {/* Explicit Status Indicator with Icon + Text */}
                  {selectedCoverage.status === 'confirmed' ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Confirmed Service Area</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#75401F] bg-[#FFFDF9] border border-[#75401F]/20 px-3 py-1.5 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-[#D94D78] shrink-0" />
                      <span>Confirmation Required</span>
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#352319]/85 leading-relaxed font-normal">
                    {selectedCoverage.details}
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#75401F]/15 space-y-2.5">
                  <div className="flex items-center gap-2 text-[#542B16] font-bold text-sm">
                    <Info className="w-4 h-4 text-[#D94D78] shrink-0" />
                    <span>Explore Service Availability</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#352319]/80 leading-relaxed">
                    Click or tap any state on the USA map—or select a state above—to inspect availability and schedule service confirmation.
                  </p>
                  {!hasConfiguredStates && (
                    <p className="text-[11px] text-[#75401F] font-semibold pt-1">
                      Coverage maps are confirmed directly with our dispatch team based on your exact address or ZIP code.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Panel Actions: Book Now + Direct Instagram Message */}
            <div className="pt-5 mt-5 border-t border-[#75401F]/12 space-y-2.5">
              <button
                type="button"
                onClick={() =>
                  onBookNow(
                    undefined,
                    selectedState ? `${selectedState.name} (${selectedState.code})` : ''
                  )
                }
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] active:bg-[#b02f54] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer min-h-[48px] whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book Now</span>
              </button>

              <a
                href="https://ig.me/m/rosewoodductcleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px] whitespace-nowrap"
              >
                <Instagram className="w-4 h-4 text-[#D94D78] shrink-0" />
                <span>Confirm via Instagram DM</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. ZIP CODE AVAILABILITY CHECKER (BELOW THE MAP) */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#75401F]/20 shadow-md p-5 sm:p-8 lg:p-10 mb-8 sm:mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#75401F] block mb-1.5">
                ZIP Code Lookup
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black text-[#542B16] leading-tight mb-2">
                Check Service Availability Near You
              </h3>
              <p className="text-xs sm:text-sm text-[#352319]/80 leading-relaxed">
                Enter your 5-digit US ZIP code to check configured service routes in your neighborhood.
              </p>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleZipSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-[#D94D78]" />
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={5}
                    value={zipInput}
                    onChange={handleZipChange}
                    placeholder="Enter your ZIP Code"
                    aria-label="Enter your ZIP Code"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#FAF6F0] border border-[#75401F]/25 text-[#352319] placeholder-[#352319]/50 font-bold text-base focus:outline-none focus:ring-2 focus:ring-[#D94D78] focus:border-[#D94D78] transition-all min-h-[48px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#542B16] hover:bg-[#75401F] active:bg-[#3e1e0e] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer shrink-0 min-h-[48px] whitespace-nowrap"
                >
                  <Search className="w-4 h-4 text-[#D94D78] shrink-0" />
                  <span>CHECK AVAILABILITY</span>
                </button>
              </form>

              {/* Validation Error */}
              {zipError && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-rose-700 bg-rose-50 px-4 py-3 rounded-xl border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{zipError}</span>
                </div>
              )}

              {/* Honest ZIP Result Display */}
              {zipResult && (
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#FAF6F0] border border-[#75401F]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {zipResult.status === 'confirmed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#D94D78] shrink-0" />
                      )}
                      <span className="font-display text-sm sm:text-base font-black text-[#542B16]">
                        ZIP {zipResult.zip}
                        {zipResult.matchedState ? ` · ${zipResult.matchedState.name}` : ''}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#352319]/85 font-medium leading-relaxed">
                      {zipResult.message}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <a
                      href="https://ig.me/m/rosewoodductcleaning"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#542B16] hover:bg-[#75401F] text-white font-bold text-xs uppercase tracking-wider transition-colors min-h-[42px] whitespace-nowrap"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#D94D78] shrink-0" />
                      <span>Message Team</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        onBookNow(
                          undefined,
                          zipResult.matchedState
                            ? `ZIP ${zipResult.zip}, ${zipResult.matchedState.name}`
                            : `ZIP ${zipResult.zip}`
                        )
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94D78] hover:bg-[#C53B64] text-white font-black text-xs uppercase tracking-wider transition-colors cursor-pointer min-h-[42px] whitespace-nowrap"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. FOUR CLEANING SERVICES INDICATORS BELOW THE MAP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {serviceIndicators.map((srv) => (
            <button
              key={srv.title}
              type="button"
              onClick={() =>
                onBookNow(
                  srv.title,
                  selectedState ? `${selectedState.name} (${selectedState.code})` : ''
                )
              }
              className="group bg-[#FFFDF9] hover:bg-white rounded-2xl border border-[#75401F]/15 hover:border-[#D94D78]/60 p-4 sm:p-5 text-left shadow-xs hover:shadow-md transition-all duration-150 flex items-center gap-3.5 cursor-pointer min-h-[72px]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F6F0E7] border border-[#75401F]/15 flex items-center justify-center shrink-0 group-hover:bg-[#FDF2F5] group-hover:border-[#D94D78]/30 transition-colors">
                {srv.icon}
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-display text-sm font-black text-[#542B16] group-hover:text-[#D94D78] transition-colors block truncate">
                  {srv.title}
                </span>
                <span className="text-[11px] text-[#352319]/70 block truncate">
                  {srv.subtitle}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#75401F]/50 group-hover:text-[#D94D78] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
