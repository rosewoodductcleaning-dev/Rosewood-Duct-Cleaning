export type ServiceType = 
  | 'Air Duct Cleaning'
  | 'Dryer Vent Cleaning'
  | 'HVAC Cleaning'
  | 'Chimney Cleaning';

export interface BookingFormData {
  fullName: string;
  address: string;
  zipCode?: string;
  phone: string;
  email?: string;
  service: ServiceType;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface ServiceItem {
  id: string;
  title: ServiceType;
  shortTag: string;
  image: string;
  description: string;
  buttonText: string;
  features: string[];
}
