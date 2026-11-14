import emailjs from '@emailjs/browser';
import { BookingFormData } from '../types';

export const EMAILJS_CONFIG = {
  serviceId: 'service_j8evhql',
  templateId: 'template_xgggdov',
  publicKey: 'hSeu0TmoBb1rv6Yf6',
  customerAutoReplyTemplateId:
    (import.meta.env.VITE_EMAILJS_CUSTOMER_TEMPLATE_ID as string | undefined)?.trim() || '',
} as const;

let isEmailJSInitialized = false;

export function ensureEmailJSInitialized(): void {
  if (!isEmailJSInitialized) {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
    });
    isEmailJSInitialized = true;
  }
}

/**
 * Formats YYYY-MM-DD into a clear US date string (e.g. "Wed, November 18, 2026")
 * without UTC-to-local off-by-one timezone shifts.
 */
export function formatBookingDate(dateStr: string): string {
  const match = dateStr?.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return dateStr?.trim() || 'Not specified';

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const localDate = new Date(year, monthIndex, day);

  if (Number.isNaN(localDate.getTime())) return dateStr;

  return localDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export interface EmailJSTemplateParams extends Record<string, string> {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_address: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  problem_notes: string;
  reply_to: string;
  to_email: string;
  to_name: string;
  booking_id: string;
  auto_reply_subject: string;
  auto_reply_message: string;
}

export function buildBookingTemplateParams(
  formData: BookingFormData,
  bookingId: string
): EmailJSTemplateParams {
  const customerName = formData.fullName.trim();
  const customerEmail = (formData.email ?? '').trim();
  const customerPhone = formData.phone.trim();
  const serviceAddress = formData.address.trim();
  const serviceType = formData.service;
  const formattedDate = formatBookingDate(formData.preferredDate);
  const preferredTime = formData.preferredTime.trim();
  const problemNotes = formData.message?.trim() || 'No additional notes provided.';

  const autoReplySubject = 'We Received Your Booking Request – Rosewood Duct Cleaning';
  const autoReplyMessage = `Hello ${customerName},

Thank you for choosing Rosewood Duct Cleaning!

We have successfully received your booking request.

YOUR BOOKING DETAILS:

Customer Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Service: ${serviceType}
Address: ${serviceAddress}
Preferred Date: ${formattedDate}
Preferred Arrival Time: ${preferredTime}

Additional Message:
${problemNotes}

Our team will review your request and contact you to confirm your appointment.

Please note that your appointment is not confirmed until our team contacts you.

Thank you for choosing Rosewood Duct Cleaning.

Cleaner Air. Healthier Spaces.

Rosewood Duct Cleaning Team`;

  return {
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone,
    service_address: serviceAddress,
    service_type: serviceType,
    preferred_date: formattedDate,
    preferred_time: preferredTime,
    problem_notes: problemNotes,
    reply_to: customerEmail,
    to_email: customerEmail,
    to_name: customerName,
    booking_id: bookingId,
    auto_reply_subject: autoReplySubject,
    auto_reply_message: autoReplyMessage,
  };
}

export async function submitBookingViaEmailJS(
  formData: BookingFormData
): Promise<{ bookingId: string; formattedDate: string }> {
  ensureEmailJSInitialized();

  const bookingId = `RDC-${Math.floor(100000 + Math.random() * 900000)}`;
  const templateParams = buildBookingTemplateParams(formData, bookingId);

  // 1. Send business notification email (and linked EmailJS Auto-Reply if configured on template_xgggdov)
  const businessResponse = await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams,
    { publicKey: EMAILJS_CONFIG.publicKey }
  );

  if (businessResponse.status !== 200) {
    throw new Error(`EmailJS failed with status ${businessResponse.status}`);
  }

  // 2. If a separate customer confirmation template ID is configured, send it explicitly too
  if (EMAILJS_CONFIG.customerAutoReplyTemplateId) {
    const customerResponse = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.customerAutoReplyTemplateId,
      templateParams,
      { publicKey: EMAILJS_CONFIG.publicKey }
    );

    if (customerResponse.status !== 200) {
      throw new Error(`Customer confirmation email failed with status ${customerResponse.status}`);
    }
  }

  return {
    bookingId,
    formattedDate: templateParams.preferred_date,
  };
}
