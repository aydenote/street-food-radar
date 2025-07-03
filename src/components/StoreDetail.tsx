
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Phone, Calendar, Heart } from "lucide-react";
import { Store } from "@/types/user";
import LocationTrustBadge from "./LocationTrustBadge";
import ReviewSystem from "./ReviewSystem";
import { useStores } from "@/hooks/useStores";

interface StoreDetailProps {
  store: Store;
  onReservationClick?: () => void;
  userRole: 'guest' | 'customer' | 'store';
  userId?: string;
  userName?: string;
  onLoginRequired?: () => void;
}

const StoreDetail = ({ store, onReservationClick, userRole, userId, userName, onLoginRequired }: StoreDetailProps) => {
  const { incrementStoreViewCount, getReviewsByStore, addReview } = useStores();
  const [reviews, setReviews] = useState(getReviewsByStore(store.id));
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // 가게 상세정보 조회 시 조회수 증가
    incrementStoreViewCount(store.id);
    setReviews(getReviewsByStore(store.id));
  }, [store.id, incrementStoreViewCount, getReviewsByStore]);

  const handleFavoriteClick = () => {
    if (userRole === 'guest') {
      onLoginRequired?.();
      return;
    }
    setIsFavorited(!isFavorited);
  };

  const handleReservationClick = () => {
    if (userRole === 'guest') {
      onLoginRequired?.();
      return;
    }
    onReservationClick?.();
  };

  const handleReviewSubmit = (reviewData: any) => {
    addReview(reviewData);
    setReviews(getReviewsByStore(store.id));
  };

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-800">{store.name}</CardTitle>
              <p className="text-gray-600 mt-1">{store.category}</p>
              <div className="mt-2">
                <LocationTrustBadge store={store} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavoriteClick}
                className={isFavorited ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${isFavorited ? "fill-red-500" : ""}`} />
                {isFavorited ? "즐겨찾기됨" : "즐겨찾기"}
              </Button>
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
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {store.description && (
            <p className="text-gray-700">{store.description}</p>
          )}
          
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{store.location.address}</span>
            {store.distance && (
              <Badge variant="outline" className="ml-2">
                {store.distance}
              </Badge>
            )}
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
          
          {store.averageRating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{store.averageRating.toFixed(1)}</span>
              {store.reviewCount && (
                <span className="text-gray-500 ml-1">({store.reviewCount}개 리뷰)</span>
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
          
          {store.isOpen && (
            <div className="pt-4 border-t">
              <Button 
                onClick={handleReservationClick}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {userRole === 'guest' ? '로그인 후 예약하기' : '예약하기'}
              </Button>
            </div>
          )}
          
          {userRole === 'guest' && (
            <p className="text-sm text-gray-500 text-center pt-2 border-t">
              로그인하고 더 많은 기능을 이용해보세요! (즐겨찾기, 리뷰 작성, 예약 등)
            </p>
          )}
        </CardContent>
      </Card>

      {/* 리뷰 시스템 */}
      <ReviewSystem
        storeId={store.id}
        reviews={reviews}
        onReviewSubmit={handleReviewSubmit}
        userRole={userRole}
        userId={userId}
        userName={userName}
      />
    </div>
  );
};

export default StoreDetail;
