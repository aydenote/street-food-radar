
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Heart, Star, Calendar } from "lucide-react";

interface LoginPromptProps {
  feature: string;
  onLogin: () => void;
  onCancel: () => void;
}

const LoginPrompt = ({ feature, onLogin, onCancel }: LoginPromptProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl">로그인하고 더 많은 정보를 확인해보세요!</CardTitle>
          <CardDescription className="mt-2">
            {feature} 기능을 이용하려면 로그인이 필요합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Heart className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-orange-800">즐겨찾기 저장</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Star className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-orange-800">리뷰 작성</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-orange-800">예약 기능</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button onClick={onCancel} variant="outline" className="flex-1">
              취소
            </Button>
            <Button onClick={onLogin} className="flex-1 bg-orange-500 hover:bg-orange-600">
              로그인하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPrompt;
