
import { useState } from "react";
import Header from "@/components/Header";
import MapView from "@/components/MapView";
import StoreList from "@/components/StoreList";
import { mockStores } from "@/data/mockData";

const MainApp = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchLocation, setSearchLocation] = useState("현재 위치");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      
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
          />
        </div>
      </div>
    </div>
  );
};

export default MainApp;
