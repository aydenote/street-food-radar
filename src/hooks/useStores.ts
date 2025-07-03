import { useState, useEffect } from 'react';
import { storeManager } from '@/store/storeStore';
import { Store, CommunityPost, Reservation } from '@/types/user';

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>(storeManager.getStores());
  const [posts, setPosts] = useState<CommunityPost[]>(storeManager.getPosts());
  const [reservations, setReservations] = useState<Reservation[]>(storeManager.getReservations());

  useEffect(() => {
    const unsubscribe = storeManager.subscribe(() => {
      setStores(storeManager.getStores());
      setPosts(storeManager.getPosts());
      setReservations(storeManager.getReservations());
    });

    return unsubscribe;
  }, []);

  return {
    stores,
    posts,
    reservations,
    getFilteredStores: (menuFilters: string[]) => storeManager.getStores(menuFilters),
    addStore: (storeData: any, ownerId: string) => storeManager.addStore(storeData, ownerId),
    updateStoreStatus: (storeId: string, isOpen: boolean) => storeManager.updateStoreStatus(storeId, isOpen),
    getStoresByOwner: (ownerId: string) => storeManager.getStoresByOwner(ownerId),
    getStoreById: (id: string) => storeManager.getStoreById(id),
    addPost: (postData: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => storeManager.addPost(postData),
    likePost: (postId: string) => storeManager.likePost(postId),
    addReservation: (reservationData: Omit<Reservation, 'id' | 'createdAt'>) => storeManager.addReservation(reservationData),
    getReservationsByStore: (storeId: string) => storeManager.getReservationsByStore(storeId),
    getReservationsByCustomer: (customerId: string) => storeManager.getReservationsByCustomer(customerId),
    addReview: (reviewData: any) => storeManager.addReview(reviewData),
    getReviewsByStore: (storeId: string) => storeManager.getReviewsByStore(storeId),
    getNotificationsByUser: (userId: string) => storeManager.getNotificationsByUser(userId),
    addNotification: (notificationData: any) => storeManager.addNotification(notificationData),
    markNotificationAsRead: (notificationId: string) => storeManager.markNotificationAsRead(notificationId),
    markAllNotificationsAsRead: (userId: string) => storeManager.markAllNotificationsAsRead(userId),
    getAnalyticsByStore: (storeId: string) => storeManager.getAnalyticsByStore(storeId),
    incrementStoreViewCount: (storeId: string) => storeManager.incrementStoreViewCount(storeId),
    updateStoreLocation: (storeId: string, lat: number, lng: number, address: string) => 
      storeManager.updateStoreLocation(storeId, lat, lng, address),
    updateStoreSchedule: (storeId: string, schedule: any) => storeManager.updateStoreSchedule(storeId, schedule)
  };
};
