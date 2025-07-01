
import { Store } from "@/types/user";

// 전역 스토어 상태 관리
class StoreManager {
  private stores: Store[] = [];
  private listeners: Array<() => void> = [];

  // 초기 목업 데이터 로드
  constructor() {
    this.stores = [
      {
        id: "1",
        name: "할머니 붕어빵",
        category: "붕어빵 · 호떡",
        isOpen: true,
        menu: ["붕어빵", "호떡", "군고구마"],
        location: {
          lat: 37.5665,
          lng: 126.9780,
          address: "서울시 중구 명동길 26"
        },
        ownerId: "owner1",
        phone: "010-1234-5678",
        openingHours: "15:00 - 24:00"
      },
      {
        id: "2", 
        name: "김밥천국 포장마차",
        category: "김밥 · 떡볶이",
        isOpen: true,
        menu: ["떡볶이", "김밥", "순대", "어묵"],
        location: {
          lat: 37.5660,
          lng: 126.9785,
          address: "서울시 중구 명동2가 54-1"
        },
        ownerId: "owner2",
        phone: "010-2345-6789",
        openingHours: "14:00 - 23:00"
      },
      {
        id: "3",
        name: "맛있는 어묵집",
        category: "어묵 · 오뎅",
        isOpen: false,
        menu: ["어묵", "오뎅탕", "만두"],
        location: {
          lat: 37.5670,
          lng: 126.9790,
          address: "서울시 중구 충무로1가 25-5"
        },
        ownerId: "owner3",
        phone: "010-3456-7890",
        openingHours: "16:00 - 22:00"
      }
    ];
  }

  // 가게 추가
  addStore(storeData: any, ownerId: string): Store {
    const newStore: Store = {
      id: Date.now().toString(),
      name: storeData.name,
      category: storeData.category,
      description: storeData.description,
      isOpen: false, // 기본적으로 영업종료 상태로 시작
      menu: storeData.menu,
      location: {
        lat: 37.5665 + (Math.random() - 0.5) * 0.01, // 랜덤 위치 생성
        lng: 126.9780 + (Math.random() - 0.5) * 0.01,
        address: storeData.address
      },
      ownerId,
      phone: storeData.phone,
      openingHours: storeData.openingHours
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

  // 가게 목록 조회
  getStores(): Store[] {
    return [...this.stores];
  }

  // 특정 가게 조회
  getStoreById(id: string): Store | undefined {
    return this.stores.find(s => s.id === id);
  }

  // 소유자별 가게 조회
  getStoresByOwner(ownerId: string): Store[] {
    return this.stores.filter(s => s.ownerId === ownerId);
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
