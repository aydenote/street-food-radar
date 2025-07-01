
export type UserRole = 'guest' | 'customer' | 'store';

export interface User {
  id: string;
  role: UserRole;
  name?: string;
  email?: string;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  description?: string;
  isOpen: boolean;
  menu: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  ownerId: string;
  phone?: string;
  openingHours?: string;
}
