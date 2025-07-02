
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Phone, Calendar } from "lucide-react";
import { Store } from "@/types/user";

interface StoreDetailProps {
  store: Store;
  onReservationClick?: () => void;
  userRole: 'guest' | 'customer' | 'store';
}

const StoreDetail = ({ store, onReservationClick, userRole }: StoreDetailProps) => {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">{store.name}</CardTitle>
            <p className="text-gray-600 mt-1">{store.category}</p>
          </div>
          <Badge 
            variant={store.isOpen ? "default" : "secondary"}
            className={`${
              store.isOpen 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {store.isOpen ? '영업중' : '영업종료'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {store.description && (
          <p className="text-gray-700">{store.description}</p>
        )}
        
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{store.location.address}</span>
        </div>
        
        {store.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{store.phone}</span>
          </div>
        )}
        
        {store.openingHours && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{store.openingHours}</span>
          </div>
        )}
        
        {store.rating && (
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{store.rating.toFixed(1)}</span>
            {store.reviews && (
              <span className="text-gray-500 ml-1">({store.reviews}개 리뷰)</span>
            )}
          </div>
        )}
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">메뉴</h4>
          <div className="flex flex-wrap gap-2">
            {store.menu.map((item, index) => (
              <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        
        {store.specialties && store.specialties.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-800 mb-2">추천 메뉴</h4>
            <div className="flex flex-wrap gap-2">
              {store.specialties.map((item, index) => (
                <Badge key={index} className="bg-red-500 hover:bg-red-600">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {userRole !== 'guest' && store.isOpen && onReservationClick && (
          <div className="pt-4 border-t">
            <Button 
              onClick={onReservationClick}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              <Calendar className="w-4 h-4 mr-2" />
              예약하기
            </Button>
          </div>
        )}
        
        {userRole === 'guest' && (
          <p className="text-sm text-gray-500 text-center pt-4 border-t">
            예약하려면 로그인이 필요합니다
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreDetail;
