
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
  distance?: string;
  viewCount?: number;
  schedule?: WeeklySchedule;
  isGpsTracked?: boolean;
  lastLocationUpdate?: Date;
  averageRating?: number;
  reviewCount?: number;
}

export interface WeeklySchedule {
  monday?: LocationSchedule;
  tuesday?: LocationSchedule;
  wednesday?: LocationSchedule;
  thursday?: LocationSchedule;
  friday?: LocationSchedule;
  saturday?: LocationSchedule;
  sunday?: LocationSchedule;
}

export interface LocationSchedule {
  address: string;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
}

export interface Review {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  images?: string[];
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

export interface Notification {
  id: string;
  userId: string;
  type: 'new_store' | 'store_opened' | 'reservation_confirmed' | 'review_reply';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  storeId?: string;
}

export interface LocationAnalytics {
  storeId: string;
  location: string;
  viewCount: number;
  date: string;
  reservationCount: number;
}
