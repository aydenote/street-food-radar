
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Menu } from "lucide-react";

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

interface StoreListProps {
  stores: Store[];
  selectedStore: Store | null;
  onStoreSelect: (store: Store) => void;
}

const StoreList = ({ stores, selectedStore, onStoreSelect }: StoreListProps) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">주변 길거리 음식점</h2>
        <span className="text-sm text-gray-500">{stores.length}개 발견</span>
      </div>
      
      {stores.map((store) => (
        <Card 
          key={store.id}
          className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedStore?.id === store.id ? 'ring-2 ring-orange-500 shadow-lg' : ''
          }`}
          onClick={() => onStoreSelect(store)}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{store.name}</h3>
                <p className="text-sm text-gray-600">{store.category}</p>
              </div>
              <div className="text-right">
                <Badge 
                  variant={store.isOpen ? "default" : "secondary"}
                  className={`mb-2 ${
                    store.isOpen 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {store.isOpen ? '영업중' : '영업종료'}
                </Badge>
                <p className="text-sm text-gray-500">{store.distance}</p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="truncate">{store.location.address}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Menu className="w-4 h-4 mr-1" />
                <span>대표 메뉴</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {store.menu.slice(0, 3).map((item, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs border-orange-200 text-orange-700"
                  >
                    {item}
                  </Badge>
                ))}
                {store.menu.length > 3 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    +{store.menu.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            {store.isOpen && (
              <div className="mt-3 flex items-center text-xs text-green-600">
                <Clock className="w-3 h-3 mr-1" />
                <span>지금 주문 가능</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoreList;
