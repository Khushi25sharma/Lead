export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Cancelled' | 'Confirmed';
export type LeadSource = 'Website' | 'Referral' | 'Social Media' | 'Advertisement' | 'Email' | 'Other';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  assignedTo: string;
}
export interface LeadFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  [key: string]: any; // allow additional filter properties
}
