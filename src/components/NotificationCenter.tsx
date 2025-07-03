
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, BellRing, MapPin, Star, Calendar, X } from "lucide-react";
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
      case 'new_store': return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'store_opened': return <BellRing className="w-4 h-4 text-green-500" />;
      case 'reservation_confirmed': return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'review_reply': return <Star className="w-4 h-4 text-yellow-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 min-w-[20px] h-5 text-xs bg-red-500 hover:bg-red-600">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 z-50">
          <Card className="shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">알림</CardTitle>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button size="sm" variant="ghost" onClick={onMarkAllAsRead}>
                      모두 읽음
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  새로운 알림이 없습니다
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.createdAt.toLocaleDateString('ko-KR', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
