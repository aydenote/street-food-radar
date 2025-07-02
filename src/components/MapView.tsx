
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Store } from "@/types/user";

interface MapViewProps {
  stores: Store[];
  selectedStore: Store | null;
  onStoreSelect: (store: Store) => void;
}

const MapView = ({ stores, selectedStore, onStoreSelect }: MapViewProps) => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
      {/* Mock map background with grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>
      
      {/* Mock roads */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300"></div>
        <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-300"></div>
        <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-300"></div>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="sm" variant="outline" className="bg-white shadow-md">
          <Locate className="w-4 h-4" />
        </Button>
        <div className="flex flex-col bg-white rounded shadow-md">
          <Button size="sm" variant="ghost" className="px-2 py-1 text-lg font-bold">+</Button>
          <Button size="sm" variant="ghost" className="px-2 py-1 text-lg font-bold">-</Button>
        </div>
      </div>

      {/* Current location marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
          <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        </div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow text-blue-600 font-medium whitespace-nowrap">
          현재 위치
        </div>
      </div>
      
      {/* Store markers */}
      {stores.map((store, index) => {
        const positions = [
          { top: '25%', left: '30%' },
          { top: '45%', left: '60%' },
          { top: '70%', left: '25%' },
          { top: '35%', left: '80%' },
          { top: '65%', left: '70%' },
          { top: '80%', left: '45%' },
        ];
        
        const position = positions[index % positions.length];
        const isSelected = selectedStore?.id === store.id;
        
        return (
          <div
            key={store.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ top: position.top, left: position.left }}
            onClick={() => onStoreSelect(store)}
          >
            <div className={`relative transition-all duration-200 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}>
              <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                store.isOpen ? 'bg-green-500' : 'bg-red-500'
              }`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              
              {isSelected && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                  <Card className="p-2 min-w-max shadow-lg">
                    <div className="text-sm font-medium">{store.name}</div>
                    <div className="text-xs text-gray-600">{store.category}</div>
                    <Badge 
                      variant={store.isOpen ? "default" : "secondary"}
                      className={`mt-1 text-xs ${
                        store.isOpen 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {store.isOpen ? '영업중' : '영업종료'}
                    </Badge>
                  </Card>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Map info overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Navigation className="w-4 h-4" />
          <span>지도 프로토타입</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          실제 앱에서는 카카오맵 연동
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
        <div className="text-xs font-medium text-gray-700 mb-2">범례</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">영업중</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-600">영업종료</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">내 위치</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
