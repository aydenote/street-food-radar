import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store, MessageCircle, Settings, BarChart3, Clock, MapPin, Wifi } from "lucide-react";
import ChatWindow from "./ChatWindow";
import StoreAnalytics from "./StoreAnalytics";
import ScheduleManager from "./ScheduleManager";
import LocationTrustBadge from "./LocationTrustBadge";
import { useStores } from "@/hooks/useStores";

interface StoreDashboardProps {
  userId: string;
  onLogout: () => void;
}

const StoreDashboard = ({ userId, onLogout }: StoreDashboardProps) => {
  const { 
    getStoresByOwner, 
    updateStoreStatus, 
    getAnalyticsByStore,
    updateStoreLocation,
    updateStoreSchedule
  } = useStores();
  
  const [userStores, setUserStores] = useState(getStoresByOwner(userId));
  const [isGpsEnabled, setIsGpsEnabled] = useState(false);

  // 사용자의 가게 정보 업데이트
  useEffect(() => {
    setUserStores(getStoresByOwner(userId));
  }, [userId, getStoresByOwner]);

  // 첫 번째 가게 정보 (단일 가게 운영 가정)
  const storeData = userStores[0];

  if (!storeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>가게 정보 없음</CardTitle>
            <CardDescription>등록된 가게 정보가 없습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onLogout} className="w-full">
              로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStatusChange = (isOpen: boolean) => {
    updateStoreStatus(storeData.id, isOpen);
  };

  const handleGpsToggle = (enabled: boolean) => {
    setIsGpsEnabled(enabled);
    if (enabled) {
      // GPS 위치 추적 시뮬레이션
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          updateStoreLocation(
            storeData.id,
            position.coords.latitude,
            position.coords.longitude,
            "GPS 기반 현재 위치"
          );
        },
        (error) => {
          console.log("GPS 위치를 가져올 수 없습니다:", error);
        }
      );
    }
  };

  const storeAnalytics = getAnalyticsByStore(storeData.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{storeData.name}</h1>
                <p className="text-sm text-gray-600">{storeData.category}</p>
                <LocationTrustBadge store={storeData} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">GPS 추적</span>
                <Switch
                  checked={isGpsEnabled}
                  onCheckedChange={handleGpsToggle}
                />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">영업상태</span>
                <Switch
                  checked={storeData.isOpen}
                  onCheckedChange={handleStatusChange}
                />
                <Badge variant={storeData.isOpen ? "default" : "secondary"} className={storeData.isOpen ? "bg-green-500" : "bg-red-500"}>
                  {storeData.isOpen ? "영업중" : "영업종료"}
                </Badge>
              </div>
              <Button variant="outline" onClick={onLogout}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">대시보드</TabsTrigger>
            <TabsTrigger value="analytics">성과 분석</TabsTrigger>
            <TabsTrigger value="schedule">스케줄 관리</TabsTrigger>
            <TabsTrigger value="messages">고객 소통</TabsTrigger>
            <TabsTrigger value="settings">가게 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>오늘 조회수</CardDescription>
                  <CardTitle className="text-2xl">{storeData.viewCount || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-600">실시간 업데이트</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>받은 리뷰</CardDescription>
                  <CardTitle className="text-2xl">{storeData.reviewCount || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-600">평균 {storeData.averageRating?.toFixed(1) || 0}점</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>영업 시간</CardDescription>
                  <CardTitle className="text-lg">{storeData.openingHours || "미설정"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">운영시간 관리</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>현재 상태</CardDescription>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${storeData.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {storeData.isOpen ? "영업중" : "영업종료"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">실시간 상태</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>가게 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">주소</p>
                    <p className="text-sm text-gray-600">{storeData.location.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">연락처</p>
                    <p className="text-sm text-gray-600">{storeData.phone || "미등록"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">메뉴</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {storeData.menu.map((item: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>최근 활동</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm">영업 상태 변경</p>
                        <p className="text-xs text-gray-500">방금 전</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-sm">새로운 문의 도착</p>
                        <p className="text-xs text-gray-500">30분 전</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <StoreAnalytics storeId={storeData.id} analytics={storeAnalytics} />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleManager 
              schedule={storeData.schedule}
              onScheduleUpdate={(schedule) => updateStoreSchedule(storeData.id, schedule)}
            />
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>고객 소통</CardTitle>
                <CardDescription>고객들과 실시간으로 소통하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatWindow userRole="store" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>가게 설정</CardTitle>
                <CardDescription>가게 정보를 수정할 수 있습니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">실시간 GPS 추적</h4>
                      <p className="text-sm text-gray-600">고객들이 실시간으로 가게 위치를 확인할 수 있습니다</p>
                    </div>
                    <Switch
                      checked={isGpsEnabled}
                      onCheckedChange={handleGpsToggle}
                    />
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">위치 신뢰도</h4>
                    <LocationTrustBadge store={storeData} />
                    <p className="text-sm text-gray-600 mt-2">
                      마지막 위치 업데이트: {storeData.lastLocationUpdate?.toLocaleString('ko-KR') || '미확인'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreDashboard;
