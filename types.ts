
export type UserRole = 'admin' | 'student' | 'host';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  campus?: string;
  avatar?: string;
  joinedAt: string;
}

export interface House {
  id: number;
  title: string;
  campus: string;
  type: 'Bedsitter' | 'Single Room' | 'Shared Room'| 'Studio Apartment';
  price: number;
  location: string;
  distance: string;
  available: string;
  amenities: string[];
  description: string;
  photos: string[];
  whatsappNumber: string;
  landlordName: string;
  createdAt: string;
  mapLink?: string;
}

export interface ContactLead {
  id: string;
  studentName: string;
  propertyName: string;
  landlordName: string;
  timestamp: string;
}

export interface FilterCriteria {
  campus: string;
  type: string;
  maxPrice: number | null;
}

export interface SmartAlert {
  id: string;
  name: string;
  criteria: FilterCriteria;
  lastChecked: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export interface HostRequest {
  id: string;
  userId: string;
  userName: string;
  propertyName: string;
  propertyAddress: string;
  status: 'pending' | 'approved' | 'declined';
  requestedAt: string;
}
