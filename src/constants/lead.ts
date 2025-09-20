// lead status options
export const STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Qualified',
  'Confirmed',
  'Lost',
  'Cancelled'
] as const;

// lead source options
export const SOURCE_OPTIONS = [
  'Website',
  'Referral',
  'Social Media',
  'Advertisement',
  'Email',
  'Other'
] as const;

// default lead form values
export const DEFAULT_LEAD_VALUES = {
  name: '',
  email: '',
  phone: '',
  status: 'New',
  source: 'Website',
  assignedTo: '',
  notes: ''
};

// lead status colors
export const STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-purple-100 text-purple-800',
  Qualified: 'bg-green-100 text-green-800',
  Confirmed: 'bg-indigo-100 text-indigo-800',
  Lost: 'bg-red-100 text-red-800',
  Cancelled: 'bg-gray-100 text-gray-800'
};
