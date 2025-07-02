
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
  rating?: number;
  reviews?: number;
  specialties?: string[];
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  storeId?: string;
  storeName?: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  date: string;
  time: string;
  people: number;
  menu: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}
