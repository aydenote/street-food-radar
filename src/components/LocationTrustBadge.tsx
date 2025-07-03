
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Wifi } from "lucide-react";
import { Store } from "@/types/user";

interface LocationTrustBadgeProps {
  store: Store;
}

const LocationTrustBadge = ({ store }: LocationTrustBadgeProps) => {
  const getLastUpdateText = () => {
    if (!store.lastLocationUpdate) return "위치 미확인";
    
    const now = new Date();
    const lastUpdate = new Date(store.lastLocationUpdate);
    const diffMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
    
    if (diffMinutes < 5) return "실시간 확인됨";
    if (diffMinutes < 30) return `${diffMinutes}분 전 확인`;
    if (diffMinutes < 60) return "1시간 내 확인";
    return "위치 재확인 필요";
  };

  const getTrustLevel = () => {
    if (!store.lastLocationUpdate) return "low";
    
    const now = new Date();
    const lastUpdate = new Date(store.lastLocationUpdate);
    const diffMinutes = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60));
    
    if (diffMinutes < 5) return "high";
    if (diffMinutes < 30) return "medium";
    return "low";
  };

  const trustLevel = getTrustLevel();
  const updateText = getLastUpdateText();

  return (
    <div className="flex items-center gap-2">
      {store.isGpsTracked ? (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">
          <Wifi className="w-3 h-3 mr-1" />
          실시간 추적
        </Badge>
      ) : (
        <Badge 
          variant={trustLevel === "high" ? "default" : "secondary"}
          className={
            trustLevel === "high" 
              ? "bg-green-500 hover:bg-green-600" 
              : trustLevel === "medium" 
              ? "bg-yellow-500 hover:bg-yellow-600 text-white" 
              : "bg-red-500 hover:bg-red-600 text-white"
          }
        >
          <MapPin className="w-3 h-3 mr-1" />
          {updateText}
        </Badge>
      )}
      
      {store.schedule && (
        <Badge variant="outline" className="border-blue-200 text-blue-700">
          <Clock className="w-3 h-3 mr-1" />
          스케줄 등록됨
        </Badge>
      )}
    </div>
  );
};

export default LocationTrustBadge;
