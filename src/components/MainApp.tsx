
import { useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import StoreList from "@/components/StoreList";
import StoreDetail from "@/components/StoreDetail";
import ReservationModal from "@/components/ReservationModal";
import Community from "@/components/Community";
import FilterControls from "@/components/FilterControls";
import LoginPrompt from "@/components/LoginPrompt";
import NotificationCenter from "@/components/NotificationCenter";
import { useStores } from "@/hooks/useStores";
import { UserRole, Store } from "@/types/user"; 
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Map, List, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MainAppProps {
  userRole: UserRole;
  onLogout: () => void;
  onRoleChange?: (role: UserRole) => void;
}

const MainApp = ({ userRole, onLogout, onRoleChange }: MainAppProps) => {
  const { toast } = useToast();
  const { 
    getFilteredStores, 
    getStoreById,
    posts,
    addPost,
    likePost,
    addReservation,
    getNotificationsByUser,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification
  } = useStores();
  
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [searchLocation, setSearchLocation] = useState("현재 위치");
  const [showStoreDetail, setShowStoreDetail] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginPromptFeature, setLoginPromptFeature] = useState("");
  const [currentView, setCurrentView] = useState<'map' | 'community'>('map');
  const [menuFilters, setMenuFilters] = useState<string[]>([]);
  
  const filteredStores = getFilteredStores(menuFilters);

  const currentUser = {
    id: userRole === 'guest' ? 'guest' : Date.now().toString(),
    name: userRole === 'guest' ? 'Guest' : 'User'
  };

  const notifications = userRole !== 'guest' ? getNotificationsByUser(currentUser.id) : [];

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
    setShowStoreDetail(true);
  };

  const handleLoginRequired = (feature: string = "이 기능") => {
    setLoginPromptFeature(feature);
    setShowLoginPrompt(true);
  };

  const handleLoginPromptLogin = () => {
    setShowLoginPrompt(false);
    onRoleChange?.('customer');
    toast({
      title: "로그인 완료!",
      description: "이제 모든 기능을 이용하실 수 있습니다.",
    });
  };

  const handleReservationSubmit = (reservationData: any) => {
    if (userRole === 'guest') {
      handleLoginRequired("예약 기능");
      return;
    }

    addReservation(reservationData);
    
    // 예약 확인 알림 추가
    addNotification({
      userId: currentUser.id,
      type: 'reservation_confirmed',
      title: '예약이 확정되었습니다',
      message: `${selectedStore?.name}에 예약이 성공적으로 접수되었습니다.`,
      isRead: false,
      storeId: selectedStore?.id
    });
    
    toast({
      title: "예약 완료!",
      description: `${selectedStore?.name}에 예약이 성공적으로 접수되었습니다.`,
    });

    setShowReservationModal(false);
  };

  const handlePostCreate = (postData: any) => {
    if (userRole === 'guest') {
      handleLoginRequired("커뮤니티 글 작성");
      return;
    }
    addPost(postData);
    toast({
      title: "게시글 작성 완료!",
      description: "커뮤니티에 글이 등록되었습니다.",
    });
  };

  const handlePostLike = (postId: string) => {
    if (userRole === 'guest') {
      handleLoginRequired("좋아요 기능");
      return;
    }
    likePost(postId);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation}
        userRole={userRole}
        onLogout={onLogout}
        notifications={userRole !== 'guest' ? (
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={markNotificationAsRead}
            onMarkAllAsRead={() => markAllNotificationsAsRead(currentUser.id)}
          />
        ) : undefined}
      />
      
      {/* 게스트 사용자를 위한 안내 배너 */}
      {userRole === 'guest' && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 text-center">
          <p className="text-sm">
            🎉 더 많은 기능을 이용하려면 로그인하세요! (즐겨찾기, 리뷰 작성, 예약 등)
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 text-white hover:bg-white/20"
              onClick={() => onRoleChange?.('customer')}
            >
              로그인하기
            </Button>
          </p>
        </div>
      )}
      
      {/* 네비게이션 탭 */}
      <div className="flex border-b bg-white">
        <Button
          variant={currentView === 'map' ? 'default' : 'ghost'}
          className={`flex-1 rounded-none ${currentView === 'map' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
          onClick={() => setCurrentView('map')}
        >
          <Map className="w-4 h-4 mr-2" />
          지도 & 가게목록
        </Button>
        <Button
          variant={currentView === 'community' ? 'default' : 'ghost'}
          className={`flex-1 rounded-none ${currentView === 'community' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
          onClick={() => setCurrentView('community')}
        >
          <Users className="w-4 h-4 mr-2" />
          커뮤니티
        </Button>
      </div>

      {currentView === 'map' ? (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)]">
          <div className="lg:w-1/2 h-64 lg:h-full">
            <MapView 
              stores={filteredStores} 
              selectedStore={selectedStore}
              onStoreSelect={handleStoreSelect}
            />
          </div>
          
          <div className="lg:w-1/2 h-full overflow-y-auto">
            <FilterControls 
              onFilterChange={setMenuFilters}
              selectedFilters={menuFilters}
            />
            <StoreList 
              stores={filteredStores}
              selectedStore={selectedStore}
              onStoreSelect={handleStoreSelect}
              userRole={userRole}
              onChatOpen={(store) => {
                if (userRole === 'guest') {
                  handleLoginRequired("가게 문의");
                  return;
                }
                setSelectedStore(store);
                setShowStoreDetail(true);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-160px)] overflow-y-auto">
          <Community
            posts={posts}
            onPostCreate={handlePostCreate}
            onPostLike={handlePostLike}
            userRole={userRole}
            userId={currentUser.id}
            userName={currentUser.name}
          />
        </div>
      )}

      {/* 가게 상세 정보 모달 */}
      {showStoreDetail && selectedStore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 bg-white shadow-md hover:bg-gray-100"
              onClick={() => setShowStoreDetail(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <StoreDetail
              store={selectedStore}
              onReservationClick={() => {
                if (userRole === 'guest') {
                  handleLoginRequired("예약 기능");
                  return;
                }
                setShowReservationModal(true);
              }}
              userRole={userRole}
              userId={currentUser.id}
              userName={currentUser.name}
              onLoginRequired={() => handleLoginRequired("상세 정보 이용")}
            />
          </div>
        </div>
      )}

      {/* 예약 모달 */}
      {showReservationModal && selectedStore && userRole !== 'guest' && (
        <ReservationModal
          store={selectedStore}
          onClose={() => setShowReservationModal(false)}
          onReservationSubmit={handleReservationSubmit}
          userId={currentUser.id}
          userName={currentUser.name}
        />
      )}

      {/* 로그인 유도 모달 */}
      {showLoginPrompt && (
        <LoginPrompt
          feature={loginPromptFeature}
          onLogin={handleLoginPromptLogin}
          onCancel={() => setShowLoginPrompt(false)}
        />
      )}
    </div>
  );
};

export default MainApp;
