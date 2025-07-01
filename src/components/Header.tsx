
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Utensils, User, LogOut } from "lucide-react";
import { UserRole } from "@/types/user";

interface HeaderProps {
  searchLocation: string;
  setSearchLocation: (location: string) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const Header = ({ searchLocation, setSearchLocation, userRole, onLogout }: HeaderProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchLocation(inputValue);
      setInputValue("");
    }
  };

  const handleCurrentLocation = () => {
    setSearchLocation("현재 위치");
  };

  const getUserRoleDisplay = () => {
    switch (userRole) {
      case 'guest':
        return { label: '게스트', color: 'bg-gray-500' };
      case 'customer':
        return { label: '일반회원', color: 'bg-green-500' };
      case 'store':
        return { label: '가게운영자', color: 'bg-orange-500' };
      default:
        return { label: '게스트', color: 'bg-gray-500' };
    }
  };

  const roleDisplay = getUserRoleDisplay();

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">길거리 맛집</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className={`${roleDisplay.color} text-white`}>
              <User className="w-3 h-3 mr-1" />
              {roleDisplay.label}
            </Badge>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-1" />
              로그아웃
            </Button>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="위치를 입력하세요 (예: 선릉역, 봉천로55길 21)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 pr-4 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            검색
          </Button>
          <Button 
            variant="outline"
            onClick={handleCurrentLocation}
            className="border-orange-500 text-orange-500 hover:bg-orange-50 px-4"
          >
            <MapPin className="w-4 h-4 mr-2" />
            현재 위치
          </Button>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{searchLocation} 기준</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
