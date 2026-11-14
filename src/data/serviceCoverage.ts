export interface USStateInfo {
  fips: string;
  code: string;
  name: string;
  region: 'Northeast' | 'Midwest' | 'South' | 'West';
}

export type CoverageStatus = 'confirmed' | 'confirmation-required';

export interface StateCoverageResult {
  state: USStateInfo;
  status: CoverageStatus;
  headline: string;
  details: string;
}

export interface ZipCoverageResult {
  zip: string;
  status: CoverageStatus;
  matchedState: USStateInfo | null;
  message: string;
}

/**
 * Explicit service coverage configuration.
 * Add 2-letter state codes (e.g. 'TX', 'GA') or specific 5-digit ZIP codes / 3-digit prefixes
 * as Rosewood dispatches expand. Empty arrays mean coverage requires direct team confirmation.
 */
export const SERVICE_COVERAGE_CONFIG = {
  confirmedStates: [] as string[],
  confirmedZipCodes: [] as string[],
  confirmedZipPrefixes: [] as string[],
};

export const US_STATES: USStateInfo[] = [
  { fips: '01', code: 'AL', name: 'Alabama', region: 'South' },
  { fips: '02', code: 'AK', name: 'Alaska', region: 'West' },
  { fips: '04', code: 'AZ', name: 'Arizona', region: 'West' },
  { fips: '05', code: 'AR', name: 'Arkansas', region: 'South' },
  { fips: '06', code: 'CA', name: 'California', region: 'West' },
  { fips: '08', code: 'CO', name: 'Colorado', region: 'West' },
  { fips: '09', code: 'CT', name: 'Connecticut', region: 'Northeast' },
  { fips: '10', code: 'DE', name: 'Delaware', region: 'South' },
  { fips: '11', code: 'DC', name: 'District of Columbia', region: 'South' },
  { fips: '12', code: 'FL', name: 'Florida', region: 'South' },
  { fips: '13', code: 'GA', name: 'Georgia', region: 'South' },
  { fips: '15', code: 'HI', name: 'Hawaii', region: 'West' },
  { fips: '16', code: 'ID', name: 'Idaho', region: 'West' },
  { fips: '17', code: 'IL', name: 'Illinois', region: 'Midwest' },
  { fips: '18', code: 'IN', name: 'Indiana', region: 'Midwest' },
  { fips: '19', code: 'IA', name: 'Iowa', region: 'Midwest' },
  { fips: '20', code: 'KS', name: 'Kansas', region: 'Midwest' },
  { fips: '21', code: 'KY', name: 'Kentucky', region: 'South' },
  { fips: '22', code: 'LA', name: 'Louisiana', region: 'South' },
  { fips: '23', code: 'ME', name: 'Maine', region: 'Northeast' },
  { fips: '24', code: 'MD', name: 'Maryland', region: 'South' },
  { fips: '25', code: 'MA', name: 'Massachusetts', region: 'Northeast' },
  { fips: '26', code: 'MI', name: 'Michigan', region: 'Midwest' },
  { fips: '27', code: 'MN', name: 'Minnesota', region: 'Midwest' },
  { fips: '28', code: 'MS', name: 'Mississippi', region: 'South' },
  { fips: '29', code: 'MO', name: 'Missouri', region: 'Midwest' },
  { fips: '30', code: 'MT', name: 'Montana', region: 'West' },
  { fips: '31', code: 'NE', name: 'Nebraska', region: 'Midwest' },
  { fips: '32', code: 'NV', name: 'Nevada', region: 'West' },
  { fips: '33', code: 'NH', name: 'New Hampshire', region: 'Northeast' },
  { fips: '34', code: 'NJ', name: 'New Jersey', region: 'Northeast' },
  { fips: '35', code: 'NM', name: 'New Mexico', region: 'West' },
  { fips: '36', code: 'NY', name: 'New York', region: 'Northeast' },
  { fips: '37', code: 'NC', name: 'North Carolina', region: 'South' },
  { fips: '38', code: 'ND', name: 'North Dakota', region: 'Midwest' },
  { fips: '39', code: 'OH', name: 'Ohio', region: 'Midwest' },
  { fips: '40', code: 'OK', name: 'Oklahoma', region: 'South' },
  { fips: '41', code: 'OR', name: 'Oregon', region: 'West' },
  { fips: '42', code: 'PA', name: 'Pennsylvania', region: 'Northeast' },
  { fips: '44', code: 'RI', name: 'Rhode Island', region: 'Northeast' },
  { fips: '45', code: 'SC', name: 'South Carolina', region: 'South' },
  { fips: '46', code: 'SD', name: 'South Dakota', region: 'Midwest' },
  { fips: '47', code: 'TN', name: 'Tennessee', region: 'South' },
  { fips: '48', code: 'TX', name: 'Texas', region: 'South' },
  { fips: '49', code: 'UT', name: 'Utah', region: 'West' },
  { fips: '50', code: 'VT', name: 'Vermont', region: 'Northeast' },
  { fips: '51', code: 'VA', name: 'Virginia', region: 'South' },
  { fips: '53', code: 'WA', name: 'Washington', region: 'West' },
  { fips: '54', code: 'WV', name: 'West Virginia', region: 'South' },
  { fips: '55', code: 'WI', name: 'Wisconsin', region: 'Midwest' },
  { fips: '56', code: 'WY', name: 'Wyoming', region: 'West' },
];

export const US_STATES_BY_FIPS: Record<string, USStateInfo> = Object.fromEntries(
  US_STATES.map((s) => [s.fips, s])
);

export const US_STATES_BY_CODE: Record<string, USStateInfo> = Object.fromEntries(
  US_STATES.map((s) => [s.code, s])
);

// Small Northeast/Mid-Atlantic states where SVG interior labels would collide visually
export const SMALL_LABEL_STATES = new Set(['CT', 'DE', 'DC', 'MA', 'MD', 'NH', 'NJ', 'RI', 'VT']);

const ZIP_PREFIX_RANGES: Array<{ min: number; max: number; code: string }> = [
  { min: 5, max: 5, code: 'NY' },
  { min: 10, max: 27, code: 'MA' },
  { min: 28, max: 29, code: 'RI' },
  { min: 30, max: 38, code: 'NH' },
  { min: 39, max: 49, code: 'ME' },
  { min: 50, max: 54, code: 'VT' },
  { min: 55, max: 55, code: 'MA' },
  { min: 56, max: 59, code: 'VT' },
  { min: 60, max: 69, code: 'CT' },
  { min: 70, max: 89, code: 'NJ' },
  { min: 100, max: 149, code: 'NY' },
  { min: 150, max: 196, code: 'PA' },
  { min: 197, max: 199, code: 'DE' },
  { min: 200, max: 200, code: 'DC' },
  { min: 201, max: 201, code: 'VA' },
  { min: 202, max: 205, code: 'DC' },
  { min: 206, max: 219, code: 'MD' },
  { min: 220, max: 246, code: 'VA' },
  { min: 247, max: 268, code: 'WV' },
  { min: 270, max: 289, code: 'NC' },
  { min: 290, max: 299, code: 'SC' },
  { min: 300, max: 319, code: 'GA' },
  { min: 320, max: 349, code: 'FL' },
  { min: 350, max: 369, code: 'AL' },
  { min: 370, max: 385, code: 'TN' },
  { min: 386, max: 397, code: 'MS' },
  { min: 398, max: 399, code: 'GA' },
  { min: 400, max: 427, code: 'KY' },
  { min: 430, max: 459, code: 'OH' },
  { min: 460, max: 479, code: 'IN' },
  { min: 480, max: 499, code: 'MI' },
  { min: 500, max: 528, code: 'IA' },
  { min: 530, max: 549, code: 'WI' },
  { min: 550, max: 567, code: 'MN' },
  { min: 569, max: 569, code: 'DC' },
  { min: 570, max: 577, code: 'SD' },
  { min: 580, max: 588, code: 'ND' },
  { min: 590, max: 599, code: 'MT' },
  { min: 600, max: 629, code: 'IL' },
  { min: 630, max: 658, code: 'MO' },
  { min: 660, max: 679, code: 'KS' },
  { min: 680, max: 693, code: 'NE' },
  { min: 700, max: 714, code: 'LA' },
  { min: 716, max: 729, code: 'AR' },
  { min: 730, max: 731, code: 'OK' },
  { min: 733, max: 733, code: 'TX' },
  { min: 734, max: 749, code: 'OK' },
  { min: 750, max: 799, code: 'TX' },
  { min: 800, max: 816, code: 'CO' },
  { min: 820, max: 831, code: 'WY' },
  { min: 832, max: 838, code: 'ID' },
  { min: 840, max: 847, code: 'UT' },
  { min: 850, max: 865, code: 'AZ' },
  { min: 870, max: 884, code: 'NM' },
  { min: 885, max: 885, code: 'TX' },
  { min: 889, max: 898, code: 'NV' },
  { min: 900, max: 961, code: 'CA' },
  { min: 967, max: 968, code: 'HI' },
  { min: 970, max: 979, code: 'OR' },
  { min: 980, max: 994, code: 'WA' },
  { min: 995, max: 999, code: 'AK' },
];

export function getStateFromZip(zip: string): USStateInfo | null {
  if (!/^\d{5}$/.test(zip)) return null;
  if (zip === '06390') return US_STATES_BY_CODE['NY'] ?? null;

  const prefix = parseInt(zip.slice(0, 3), 10);
  const match = ZIP_PREFIX_RANGES.find((r) => prefix >= r.min && prefix <= r.max);
  return match ? US_STATES_BY_CODE[match.code] ?? null : null;
}

export function getStateCoverage(state: USStateInfo): StateCoverageResult {
  const isConfirmed = SERVICE_COVERAGE_CONFIG.confirmedStates.includes(state.code);

  if (isConfirmed) {
    return {
      state,
      status: 'confirmed',
      headline: `Active Service Area in ${state.name}`,
      details: `Rosewood Duct Cleaning dispatches certified technicians across confirmed service routes in ${state.name}. Book online or message us to schedule your appointment.`,
    };
  }

  return {
    state,
    status: 'confirmation-required',
    headline: `Confirmation Required for ${state.name}`,
    details: `Service availability in ${state.name} has not been pre-configured for instant dispatch. Please contact our team to confirm service availability in your area or submit a booking request.`,
  };
}

export function checkZipCoverage(zip: string): ZipCoverageResult {
  const cleanZip = zip.trim();
  const matchedState = getStateFromZip(cleanZip);
  const prefix3 = cleanZip.slice(0, 3);

  const isZipConfigured =
    SERVICE_COVERAGE_CONFIG.confirmedZipCodes.includes(cleanZip) ||
    SERVICE_COVERAGE_CONFIG.confirmedZipPrefixes.includes(prefix3) ||
    (matchedState ? SERVICE_COVERAGE_CONFIG.confirmedStates.includes(matchedState.code) : false);

  if (isZipConfigured) {
    return {
      zip: cleanZip,
      status: 'confirmed',
      matchedState,
      message: matchedState
        ? `Service is confirmed for ZIP ${cleanZip} (${matchedState.name}).`
        : `Service is confirmed for ZIP ${cleanZip}.`,
    };
  }

  return {
    zip: cleanZip,
    status: 'confirmation-required',
    matchedState,
    message: 'Please contact our team to confirm service availability in your area.',
  };
}
