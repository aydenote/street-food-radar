
import { Card } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

interface Store {
  id: string;
  name: string;
  category: string;
  isOpen: boolean;
  distance: string;
  menu: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

interface MapViewProps {
  stores: Store[];
  selectedStore: Store | null;
  onStoreSelect: (store: Store) => void;
}

const MapView = ({ stores, selectedStore, onStoreSelect }: MapViewProps) => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
          <Navigation className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">지도 연동</h3>
          <p className="text-gray-600 text-sm mb-4">
            실제 앱에서는 여기에 네이버 지도 또는 카카오 지도가 표시됩니다
          </p>
          <div className="text-xs text-gray-500">
            프로토타입에서는 목업으로 대체
          </div>
        </div>
      </div>
      
      {/* Mock map markers */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
        {stores.slice(0, 5).map((store) => (
          <Card 
            key={store.id}
            className={`p-2 cursor-pointer transition-all duration-200 ${
              selectedStore?.id === store.id 
                ? 'bg-orange-500 text-white shadow-lg scale-105' 
                : 'bg-white hover:bg-orange-50'
            }`}
            onClick={() => onStoreSelect(store)}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{store.name}</span>
              <span className={`w-2 h-2 rounded-full ${store.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapView;
