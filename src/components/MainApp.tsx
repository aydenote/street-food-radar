
import { useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import StoreList from "@/components/StoreList";
import ChatWindow from "@/components/ChatWindow";
import { mockStores } from "@/data/mockData";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

interface MainAppProps {
  userRole: UserRole;
  onLogout: () => void;
}

const MainApp = ({ userRole, onLogout }: MainAppProps) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchLocation, setSearchLocation] = useState("현재 위치");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation}
        userRole={userRole}
        onLogout={onLogout}
      />
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        <div className="lg:w-1/2 h-64 lg:h-full">
          <MapView 
            stores={mockStores} 
            selectedStore={selectedStore}
            onStoreSelect={setSelectedStore}
          />
        </div>
        
        <div className="lg:w-1/2 h-full overflow-y-auto">
          <StoreList 
            stores={mockStores}
            selectedStore={selectedStore}
            onStoreSelect={setSelectedStore}
            userRole={userRole}
            onChatOpen={(store) => {
              setSelectedStore(store);
              setShowChat(true);
            }}
          />
        </div>
      </div>

      {/* 채팅 모달 */}
      {showChat && selectedStore && userRole !== 'guest' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[500px] relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={() => setShowChat(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="h-full p-4">
              <ChatWindow
                userRole={userRole === 'customer' ? 'customer' : 'customer'}
                storeName={selectedStore.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* 플로팅 채팅 버튼 (고객용) */}
      {userRole !== 'guest' && selectedStore && !showChat && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
          onClick={() => setShowChat(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default MainApp;
