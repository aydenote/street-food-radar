
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MapPin, TrendingUp, Users, Calendar } from "lucide-react";
import { LocationAnalytics } from "@/types/user";

interface StoreAnalyticsProps {
  storeId: string;
  analytics: LocationAnalytics[];
}

const StoreAnalytics = ({ storeId, analytics }: StoreAnalyticsProps) => {
  const locationData = analytics.reduce((acc, item) => {
    const existing = acc.find(a => a.location === item.location);
    if (existing) {
      existing.totalViews += item.viewCount;
      existing.totalReservations += item.reservationCount;
    } else {
      acc.push({
        location: item.location,
        totalViews: item.viewCount,
        totalReservations: item.reservationCount,
      });
    }
    return acc;
  }, [] as any[]);

  const weeklyData = analytics.slice(-7).map(item => ({
    date: new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    views: item.viewCount,
    reservations: item.reservationCount,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              총 조회수
            </CardDescription>
            <CardTitle className="text-2xl">
              {analytics.reduce((sum, item) => sum + item.viewCount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              총 예약수
            </CardDescription>
            <CardTitle className="text-2xl">
              {analytics.reduce((sum, item) => sum + item.reservationCount, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              운영 위치
            </CardDescription>
            <CardTitle className="text-2xl">
              {locationData.length}개
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            위치별 성과 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalViews" fill="#f97316" name="조회수" />
                <Bar dataKey="totalReservations" fill="#22c55e" name="예약수" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">위치별 성과 순위</h4>
            {locationData
              .sort((a, b) => b.totalViews - a.totalViews)
              .slice(0, 3)
              .map((item, index) => (
                <div key={item.location} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {index + 1}위
                    </Badge>
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    조회 {item.totalViews}회 · 예약 {item.totalReservations}건
                  </span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>주간 트렌드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#f97316" name="조회수" />
                <Line type="monotone" dataKey="reservations" stroke="#22c55e" name="예약수" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreAnalytics;
