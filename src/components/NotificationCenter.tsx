
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BellOff, Check, CheckCheck, Store, Calendar, Star, MapPin } from "lucide-react";
import { Notification } from "@/types/user";

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_store':
        return <Store className="w-4 h-4 text-green-500" />;
      case 'store_opened':
        return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'reservation_confirmed':
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'review_reply':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {unreadCount > 0 ? (
          <Bell className="w-4 h-4" />
        ) : (
          <BellOff className="w-4 h-4" />
        )}
        {unreadCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 z-50">
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">알림</CardTitle>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMarkAllAsRead}
                    className="text-xs"
                  >
                    <CheckCheck className="w-3 h-3 mr-1" />
                    모두 읽음
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                {notifications.length > 0 ? (
                  <div className="space-y-1">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors ${
                          !notification.isRead 
                            ? 'bg-blue-50 hover:bg-blue-100' 
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">새로운 알림이 없습니다</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 클릭 외부 영역 감지를 위한 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationCenter;
