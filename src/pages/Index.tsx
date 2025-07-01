
import { useState } from "react";
import LoginTypeSelector from "@/components/LoginTypeSelector";
import StoreRegistration from "@/components/StoreRegistration";
import StoreDashboard from "@/components/StoreDashboard";
import MainApp from "@/components/MainApp";
import { User, UserRole } from "@/types/user";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showStoreRegistration, setShowStoreRegistration] = useState(false);
  const [storeData, setStoreData] = useState(null);

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
    }
  };

  const handleStoreRegistration = (data: any) => {
    const storeUser: User = {
      id: Date.now().toString(),
      role: 'store',
      name: data.name
    };
    setCurrentUser(storeUser);
    setStoreData(data);
    setShowStoreRegistration(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStoreData(null);
    setShowStoreRegistration(false);
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
    if (currentUser.role === 'store' && storeData) {
      return <StoreDashboard storeData={storeData} onLogout={handleLogout} />;
    } else {
      return <MainApp userRole={currentUser.role} onLogout={handleLogout} />;
    }
  }

  // 로그인 타입 선택 화면
  return <LoginTypeSelector onSelectType={handleLoginTypeSelect} />;
};

export default Index;
