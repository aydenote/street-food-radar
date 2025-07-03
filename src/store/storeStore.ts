import { Store, CommunityPost, Reservation, Review, Notification, LocationAnalytics } from "@/types/user";

// 전역 스토어 상태 관리
class StoreManager {
  private stores: Store[] = [];
  private posts: CommunityPost[] = [];
  private reservations: Reservation[] = [];
  private reviews: Review[] = [];
  private notifications: Notification[] = [];
  private analytics: LocationAnalytics[] = [];
  private listeners: Array<() => void> = [];

  // 초기 목업 데이터 로드
  constructor() {
    this.stores = [
      {
        id: "1",
        name: "할머니 붕어빵",
        category: "붕어빵 · 호떡",
        description: "30년 전통의 할머니가 직접 만드는 정통 붕어빵집입니다.",
        isOpen: true,
        menu: ["붕어빵", "호떡", "군고구마"],
        location: {
          lat: 37.5665,
          lng: 126.9780,
          address: "서울시 중구 명동길 26"
        },
        ownerId: "owner1",
        phone: "010-1234-5678",
        openingHours: "15:00 - 24:00",
        rating: 4.5,
        reviews: 127,
        specialties: ["팥붕어빵", "슈크림붕어빵"],
        distance: "50m",
        viewCount: 245,
        lastLocationUpdate: new Date(Date.now() - 2 * 60 * 1000),
        isGpsTracked: true,
        averageRating: 4.5,
        reviewCount: 127
      },
      {
        id: "2", 
        name: "김밥천국 포장마차",
        category: "김밥 · 떡볶이",
        description: "신선한 재료로 만드는 김밥과 매콤한 떡볶이가 일품입니다.",
        isOpen: true,
        menu: ["떡볶이", "김밥", "순대", "어묵"],
        location: {
          lat: 37.5660,
          lng: 126.9785,
          address: "서울시 중구 명동2가 54-1"
        },
        ownerId: "owner2",
        phone: "010-2345-6789",
        openingHours: "14:00 - 23:00",
        rating: 4.2,
        reviews: 89,
        specialties: ["참치김밥", "치즈떡볶이"],
        distance: "120m",
        viewCount: 189,
        lastLocationUpdate: new Date(Date.now() - 10 * 60 * 1000),
        schedule: {
          monday: { address: "서울시 중구 명동2가 54-1", lat: 37.5660, lng: 126.9785, startTime: "14:00", endTime: "23:00" },
          tuesday: { address: "서울시 중구 을지로 32", lat: 37.5662, lng: 126.9788, startTime: "14:00", endTime: "23:00" }
        },
        averageRating: 4.2,
        reviewCount: 89
      },
      {
        id: "3",
        name: "맛있는 어묵집",
        category: "어묵 · 오뎅",
        description: "진한 국물과 쫄깃한 어묵이 자랑인 어묵 전문점입니다.",
        isOpen: false,
        menu: ["어묵", "오뎅탕", "만두"],
        location: {
          lat: 37.5670,
          lng: 126.9790,
          address: "서울시 중구 충무로1가 25-5"
        },
        ownerId: "owner3",
        phone: "010-3456-7890",
        openingHours: "16:00 - 22:00",
        rating: 4.0,
        reviews: 45,
        specialties: ["특제어묵", "매운오뎅탕"],
        distance: "200m",
        viewCount: 98,
        lastLocationUpdate: new Date(Date.now() - 45 * 60 * 1000),
        averageRating: 4.0,
        reviewCount: 45
      },
      {
        id: "4",
        name: "길거리 토스트",
        category: "토스트 · 샌드위치",
        description: "바삭한 토스트와 신선한 재료로 만든 샌드위치 전문점입니다.",
        isOpen: true,
        menu: ["햄에그토스트", "치즈토스트", "베이컨토스트", "야채토스트"],
        location: {
          lat: 37.5655,
          lng: 126.9775,
          address: "서울시 중구 소공동 87"
        },
        ownerId: "owner4",
        phone: "010-4567-8901",
        openingHours: "07:00 - 22:00",
        rating: 4.3,
        reviews: 63,
        specialties: ["베이컨치즈토스트", "아보카도토스트"],
        distance: "300m",
        viewCount: 156,
        lastLocationUpdate: new Date(Date.now() - 3 * 60 * 1000),
        isGpsTracked: true,
        averageRating: 4.3,
        reviewCount: 63
      },
      {
        id: "5",
        name: "전통 호떡가게",
        category: "호떡 · 전통간식",
        description: "달콤한 전통 호떡과 다양한 속재료로 유명한 호떡 전문점입니다.",
        isOpen: true,
        menu: ["씨앗호떡", "흑설탕호떡", "녹차호떡"],
        location: {
          lat: 37.5675,
          lng: 126.9795,
          address: "서울시 중구 을지로1가 16"
        },
        ownerId: "owner5",
        phone: "010-5678-9012",
        openingHours: "15:00 - 23:00",
        rating: 4.6,
        reviews: 98,
        specialties: ["견과류호떡", "치즈호떡"],
        distance: "350m",
        viewCount: 203,
        lastLocationUpdate: new Date(Date.now() - 15 * 60 * 1000),
        averageRating: 4.6,
        reviewCount: 98
      },
      {
        id: "6",
        name: "야식이네 포장마차",
        category: "야식 · 안주",
        description: "밤늦게까지 영업하는 야식과 안주 전문 포장마차입니다.",
        isOpen: false,
        menu: ["라면", "김치찌개", "계란말이", "소시지"],
        location: {
          lat: 37.5650,
          lng: 126.9770,
          address: "서울시 중구 회현동1가 100-1"
        },
        ownerId: "owner6",
        phone: "010-6789-0123",
        openingHours: "18:00 - 02:00",
        rating: 3.8,
        reviews: 34,
        specialties: ["진라면", "참치김치찌개"],
        distance: "400m",
        viewCount: 78,
        lastLocationUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        averageRating: 3.8,
        reviewCount: 34
      }
    ];

    this.posts = [
      {
        id: "1",
        title: "할머니 붕어빵 정말 맛있어요!",
        content: "명동에서 30년 된 할머니 붕어빵집인데 정말 맛있습니다. 팥이 꽉 차있고 겉은 바삭해요!",
        authorId: "user1",
        authorName: "김맛집",
        authorRole: "customer",
        storeId: "1",
        storeName: "할머니 붕어빵",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 15,
        comments: []
      },
      {
        id: "2", 
        title: "떡볶이 맛집 추천드려요",
        content: "김밥천국 포장마차 떡볶이가 진짜 맛있어요. 매콤하면서도 단맛이 있어서 중독성 있습니다!",
        authorId: "user2",
        authorName: "길거리푸드러버",
        authorRole: "customer",
        storeId: "2",
        storeName: "김밥천국 포장마차",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        likes: 8,
        comments: []
      }
    ];

    // 리뷰 목 데이터
    this.reviews = [
      {
        id: "r1",
        storeId: "1",
        customerId: "user1",
        customerName: "김맛집",
        rating: 5,
        comment: "정말 맛있어요! 할머니가 직접 만드시는 붕어빵이 최고입니다.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        images: []
      },
      {
        id: "r2",
        storeId: "2",
        customerId: "user2",
        customerName: "떡볶이러버",
        rating: 4,
        comment: "떡볶이가 매콤하니 맛있네요. 김밥도 푸짐해요!",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        images: []
      }
    ];

    // 알림 목 데이터
    this.notifications = [
      {
        id: "n1",
        userId: "user1",
        type: "new_store",
        title: "새로운 가게가 근처에 오픈했어요!",
        message: "길거리 토스트가 300m 거리에 새로 문을 열었습니다.",
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        storeId: "4"
      },
      {
        id: "n2",
        userId: "user1",
        type: "store_opened",
        title: "즐겨찾는 가게가 영업을 시작했어요",
        message: "할머니 붕어빵이 지금 영업중입니다!",
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        storeId: "1"
      }
    ];

    // 분석 목 데이터
    this.analytics = [
      { storeId: "1", location: "명동길 26", viewCount: 45, date: "2024-01-01", reservationCount: 8 },
      { storeId: "1", location: "명동길 26", viewCount: 52, date: "2024-01-02", reservationCount: 12 },
      { storeId: "2", location: "명동2가 54-1", viewCount: 38, date: "2024-01-01", reservationCount: 6 },
      { storeId: "2", location: "을지로 32", viewCount: 41, date: "2024-01-02", reservationCount: 9 }
    ];
  }

  // 가게 추가
  addStore(storeData: any, ownerId: string): Store {
    const newStore: Store = {
      id: Date.now().toString(),
      name: storeData.name,
      category: storeData.category,
      description: storeData.description,
      isOpen: false,
      menu: storeData.menu,
      location: {
        lat: 37.5665 + (Math.random() - 0.5) * 0.01,
        lng: 126.9780 + (Math.random() - 0.5) * 0.01,
        address: storeData.address
      },
      ownerId,
      phone: storeData.phone,
      openingHours: storeData.openingHours,
      rating: 0,
      reviews: 0,
      specialties: storeData.specialties || []
    };

    this.stores.push(newStore);
    this.notifyListeners();
    return newStore;
  }

  // 가게 영업 상태 업데이트
  updateStoreStatus(storeId: string, isOpen: boolean) {
    const store = this.stores.find(s => s.id === storeId);
    if (store) {
      store.isOpen = isOpen;
      this.notifyListeners();
    }
  }

  // 가게 목록 조회 (필터링 포함)
  getStores(menuFilters: string[] = []): Store[] {
    let filteredStores = [...this.stores];
    
    if (menuFilters.length > 0) {
      filteredStores = filteredStores.filter(store =>
        menuFilters.some(filter =>
          store.menu.some(menu => menu.includes(filter))
        )
      );
    }
    
    return filteredStores;
  }

  // 특정 가게 조회
  getStoreById(id: string): Store | undefined {
    return this.stores.find(s => s.id === id);
  }

  // 소유자별 가게 조회
  getStoresByOwner(ownerId: string): Store[] {
    return this.stores.filter(s => s.ownerId === ownerId);
  }

  // 커뮤니티 포스트 추가
  addPost(postData: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>): CommunityPost {
    const newPost: CommunityPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      comments: []
    };

    this.posts.unshift(newPost);
    this.notifyListeners();
    return newPost;
  }

  // 포스트 좋아요
  likePost(postId: string) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.likes += 1;
      this.notifyListeners();
    }
  }

  // 포스트 목록 조회
  getPosts(): CommunityPost[] {
    return [...this.posts];
  }

  // 포스트에 댓글 추가
  addCommentToPost(postId: string, commentData: Omit<Comment, 'id' | 'createdAt'>) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      const newComment = {
        ...commentData,
        id: Date.now().toString(),
        createdAt: new Date()
      };
      post.comments.push(newComment);
      this.notifyListeners();
    }
  }

  // 예약 추가
  addReservation(reservationData: Omit<Reservation, 'id' | 'createdAt'>): Reservation {
    const newReservation: Reservation = {
      ...reservationData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    this.reservations.push(newReservation);
    this.notifyListeners();
    return newReservation;
  }

  // 예약 목록 조회
  getReservations(): Reservation[] {
    return [...this.reservations];
  }

  // 가게별 예약 조회
  getReservationsByStore(storeId: string): Reservation[] {
    return this.reservations.filter(r => r.storeId === storeId);
  }

  // 고객별 예약 조회
  getReservationsByCustomer(customerId: string): Reservation[] {
    return this.reservations.filter(r => r.customerId === customerId);
  }

  // 리뷰 관련 메서드
  addReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Review {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    this.reviews.push(newReview);
    this.updateStoreRating(reviewData.storeId);
    this.notifyListeners();
    return newReview;
  }

  getReviewsByStore(storeId: string): Review[] {
    return this.reviews.filter(r => r.storeId === storeId);
  }

  private updateStoreRating(storeId: string) {
    const storeReviews = this.getReviewsByStore(storeId);
    const store = this.stores.find(s => s.id === storeId);
    
    if (store && storeReviews.length > 0) {
      const avgRating = storeReviews.reduce((sum, r) => sum + r.rating, 0) / storeReviews.length;
      store.averageRating = Math.round(avgRating * 10) / 10;
      store.reviewCount = storeReviews.length;
    }
  }

  // 알림 관련 메서드
  addNotification(notificationData: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    this.notifications.unshift(newNotification);
    this.notifyListeners();
    return newNotification;
  }

  getNotificationsByUser(userId: string): Notification[] {
    return this.notifications.filter(n => n.userId === userId);
  }

  markNotificationAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  markAllNotificationsAsRead(userId: string) {
    this.notifications
      .filter(n => n.userId === userId)
      .forEach(n => n.isRead = true);
    this.notifyListeners();
  }

  // 분석 관련 메서드
  getAnalyticsByStore(storeId: string): LocationAnalytics[] {
    return this.analytics.filter(a => a.storeId === storeId);
  }

  incrementStoreViewCount(storeId: string) {
    const store = this.stores.find(s => s.id === storeId);
    if (store) {
      store.viewCount = (store.viewCount || 0) + 1;
      this.notifyListeners();
    }
  }

  updateStoreLocation(storeId: string, lat: number, lng: number, address: string) {
    const store = this.stores.find(s => s.id === storeId);
    if (store) {
      store.location = { lat, lng, address };
      store.lastLocationUpdate = new Date();
      this.notifyListeners();
    }
  }

  updateStoreSchedule(storeId: string, schedule: any) {
    const store = this.stores.find(s => s.id === storeId);
    if (store) {
      store.schedule = schedule;
      this.notifyListeners();
    }
  }

  // 리스너 등록
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // 리스너들에게 변경사항 알림
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const storeManager = new StoreManager();
