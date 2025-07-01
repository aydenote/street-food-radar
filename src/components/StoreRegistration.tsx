
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface StoreRegistrationProps {
  onComplete: (storeData: any) => void;
  onBack: () => void;
}

const StoreRegistration = ({ onComplete, onBack }: StoreRegistrationProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    openingHours: '',
    menu: [] as string[]
  });
  
  const [newMenuItem, setNewMenuItem] = useState('');

  const addMenuItem = () => {
    if (newMenuItem.trim() && !formData.menu.includes(newMenuItem.trim())) {
      setFormData(prev => ({
        ...prev,
        menu: [...prev.menu, newMenuItem.trim()]
      }));
      setNewMenuItem('');
    }
  };

  const removeMenuItem = (item: string) => {
    setFormData(prev => ({
      ...prev,
      menu: prev.menu.filter(menuItem => menuItem !== item)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">가게 정보 등록</CardTitle>
          <CardDescription className="text-center">
            고객들이 찾을 수 있도록 가게 정보를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">가게명 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="예: 할머니 붕어빵"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">카테고리 *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="예: 붕어빵 · 호떡"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">주소 *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="예: 서울시 중구 명동길 26"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">연락처</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="예: 010-1234-5678"
                />
              </div>
              <div>
                <Label htmlFor="openingHours">운영시간</Label>
                <Input
                  id="openingHours"
                  value={formData.openingHours}
                  onChange={(e) => setFormData(prev => ({ ...prev, openingHours: e.target.value }))}
                  placeholder="예: 15:00 - 24:00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">가게 소개</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="가게를 소개해주세요"
                rows={3}
              />
            </div>

            <div>
              <Label>메뉴</Label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newMenuItem}
                  onChange={(e) => setNewMenuItem(e.target.value)}
                  placeholder="메뉴 이름을 입력하세요"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMenuItem())}
                />
                <Button type="button" onClick={addMenuItem} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.menu.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {item}
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer"
                      onClick={() => removeMenuItem(item)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">
                이전으로
              </Button>
              <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
                가게 등록하기
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreRegistration;
