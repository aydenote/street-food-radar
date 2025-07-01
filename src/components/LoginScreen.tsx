
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">길거리 맛집</CardTitle>
          <CardDescription className="text-gray-600 text-base mt-2">
            내 주변 길거리 음식점을 쉽게 찾아보세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-800">위치 기반 검색</span>
            </div>
            <p className="text-sm text-orange-700">
              현재 위치 또는 원하는 장소 주변의 길거리 음식점을 실시간으로 확인하세요
            </p>
          </div>
          
          <Button 
            onClick={onLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            게스트로 시작하기
          </Button>
          
          <p className="text-xs text-gray-500 text-center">
            별도의 회원가입 없이 바로 서비스를 이용할 수 있습니다
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
