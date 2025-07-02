
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Users, Clock } from "lucide-react";
import { Store, Reservation } from "@/types/user";

interface ReservationModalProps {
  store: Store;
  onClose: () => void;
  onReservationSubmit: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  userId: string;
  userName: string;
}

const ReservationModal = ({ store, onClose, onReservationSubmit, userId, userName }: ReservationModalProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [people, setPeople] = useState(2);
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);

  const timeSlots = [
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  const handleMenuToggle = (menuItem: string) => {
    setSelectedMenu(prev => 
      prev.includes(menuItem) 
        ? prev.filter(item => item !== menuItem)
        : [...prev, menuItem]
    );
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || selectedMenu.length === 0) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const reservation = {
      storeId: store.id,
      customerId: userId,
      customerName: userName,
      date: selectedDate,
      time: selectedTime,
      people,
      menu: selectedMenu,
      status: 'pending' as const
    };

    onReservationSubmit(reservation);
    onClose();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">예약하기 - {store.name}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-1" />
              날짜 선택
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              시간 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(time => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={selectedTime === time ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 mr-1" />
              인원 수
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPeople(Math.max(1, people - 1))}
              >
                -
              </Button>
              <span className="px-4 py-2 border rounded">{people}명</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPeople(Math.min(10, people + 1))}
              >
                +
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              메뉴 선택 (복수 선택 가능)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {store.menu.map(menuItem => (
                <Badge
                  key={menuItem}
                  variant={selectedMenu.includes(menuItem) ? "default" : "outline"}
                  className={`cursor-pointer text-center justify-center ${
                    selectedMenu.includes(menuItem)
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-orange-50'
                  }`}
                  onClick={() => handleMenuToggle(menuItem)}
                >
                  {menuItem}
                </Badge>
              ))}
            </div>
            {selectedMenu.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                선택된 메뉴: {selectedMenu.join(', ')}
              </p>
            )}
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={!selectedDate || !selectedTime || selectedMenu.length === 0}
            >
              예약 신청하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationModal;
