
import { useState } from "react";
import LoginTypeSelector from "@/components/LoginTypeSelector";
import StoreRegistration from "@/components/StoreRegistration";
import StoreDashboard from "@/components/StoreDashboard";
import MainApp from "@/components/MainApp";
import { User, UserRole } from "@/types/user";
import { useStores } from "@/hooks/useStores";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showStoreRegistration, setShowStoreRegistration] = useState(false);
  const { addStore, addNotification } = useStores();

  const handleLoginTypeSelect = (type: UserRole) => {
    if (type === 'store') {
      setShowStoreRegistration(true);
    } else {
      const user: User = {
        id: Date.now().toString(),
        role: type,
        name: type === 'guest' ? 'Guest' : 'User'
      };
      setCurrentUser(user);
      
      // 게스트가 아닌 경우 환영 알림 추가
      if (type !== 'guest') {
        addNotification({
          userId: user.id,
          type: 'new_store',
          title: '길거리 맛집에 오신 것을 환영합니다!',
          message: '주변 맛있는 길거리 음식점들을 찾아보세요.',
          isRead: false
        });
      }
    }
  };

  const handleStoreRegistration = (data: any) => {
    const storeUser: User = {
      id: Date.now().toString(),
      role: 'store',
      name: data.name
    };
    
    // 새 가게를 전역 스토어에 추가
    const newStore = addStore(data, storeUser.id);
    
    setCurrentUser(storeUser);
    setShowStoreRegistration(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowStoreRegistration(false);
  };

  const handleRoleChange = (role: UserRole) => {
    const user: User = {
      id: Date.now().toString(),
      role,
      name: role === 'guest' ? 'Guest' : 'User'
    };
    setCurrentUser(user);
  };

  // 가게 등록 화면
  if (showStoreRegistration) {
    return (
      <StoreRegistration
        onComplete={handleStoreRegistration}
        onBack={() => setShowStoreRegistration(false)}
      />
    );
  }

  // 로그인된 상태
  if (currentUser) {
    if (currentUser.role === 'store') {
      return <StoreDashboard userId={currentUser.id} onLogout={handleLogout} />;
    } else {
      return (
        <MainApp 
          userRole={currentUser.role} 
          onLogout={handleLogout}
          onRoleChange={handleRoleChange}
        />
      );
    }
  }

  // 로그인 타입 선택 화면
  return <LoginTypeSelector onSelectType={handleLoginTypeSelect} />;
};

export default Index;
