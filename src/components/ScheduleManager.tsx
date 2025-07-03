
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { WeeklySchedule, LocationSchedule } from "@/types/user";
import { MapPin, Clock, Plus, Trash2 } from "lucide-react";

interface ScheduleManagerProps {
  schedule?: WeeklySchedule;
  onScheduleUpdate: (schedule: WeeklySchedule) => void;
}

const ScheduleManager = ({ schedule = {}, onScheduleUpdate }: ScheduleManagerProps) => {
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempSchedule, setTempSchedule] = useState<LocationSchedule>({
    address: "",
    lat: 0,
    lng: 0,
    startTime: "",
    endTime: ""
  });

  const days = [
    { key: 'monday', label: '월요일' },
    { key: 'tuesday', label: '화요일' },
    { key: 'wednesday', label: '수요일' },
    { key: 'thursday', label: '목요일' },
    { key: 'friday', label: '금요일' },
    { key: 'saturday', label: '토요일' },
    { key: 'sunday', label: '일요일' },
  ];

  const handleSaveSchedule = () => {
    if (!editingDay) return;
    
    const newSchedule = {
      ...schedule,
      [editingDay]: tempSchedule
    };
    
    onScheduleUpdate(newSchedule);
    setEditingDay(null);
    setTempSchedule({ address: "", lat: 0, lng: 0, startTime: "", endTime: "" });
  };

  const handleDeleteSchedule = (day: string) => {
    const newSchedule = { ...schedule };
    delete newSchedule[day as keyof WeeklySchedule];
    onScheduleUpdate(newSchedule);
  };

  const startEditing = (day: string) => {
    setEditingDay(day);
    const existingSchedule = schedule[day as keyof WeeklySchedule];
    if (existingSchedule) {
      setTempSchedule(existingSchedule);
    } else {
      setTempSchedule({ address: "", lat: 0, lng: 0, startTime: "", endTime: "" });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          주간 운영 스케줄
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {days.map((day) => {
          const daySchedule = schedule[day.key as keyof WeeklySchedule];
          
          return (
            <div key={day.key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{day.label}</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEditing(day.key)}
                  >
                    {daySchedule ? "수정" : "추가"}
                  </Button>
                  {daySchedule && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteSchedule(day.key)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {daySchedule ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {daySchedule.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {daySchedule.startTime} - {daySchedule.endTime}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">운영 스케줄이 없습니다</p>
              )}
            </div>
          );
        })}
        
        {editingDay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>
                  {days.find(d => d.key === editingDay)?.label} 스케줄 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>위치</Label>
                  <Input
                    placeholder="주소를 입력하세요"
                    value={tempSchedule.address}
                    onChange={(e) => setTempSchedule({...tempSchedule, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>시작 시간</Label>
                    <Input
                      type="time"
                      value={tempSchedule.startTime}
                      onChange={(e) => setTempSchedule({...tempSchedule, startTime: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>종료 시간</Label>
                    <Input
                      type="time"
                      value={tempSchedule.endTime}
                      onChange={(e) => setTempSchedule({...tempSchedule, endTime: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleSaveSchedule} className="flex-1">
                    저장
                  </Button>
                  <Button variant="outline" onClick={() => setEditingDay(null)} className="flex-1">
                    취소
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleManager;
