
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Heart, Star, Calendar, MessageCircle, Sparkles, Gift } from "lucide-react";

interface LoginPromptProps {
  feature: string;
  onLogin: () => void;
  onCancel: () => void;
}

const LoginPrompt = ({ feature, onLogin, onCancel }: LoginPromptProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">
            🎉 더 많은 기능을 이용해보세요!
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            <span className="font-medium text-orange-600">{feature}</span> 기능을 이용하려면 로그인이 필요합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
              <div className="bg-orange-500 p-2 rounded-full">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">즐겨찾기 저장</p>
                <p className="text-xs text-gray-500">좋아하는 가게를 저장하고 빠르게 찾아보세요</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="bg-blue-500 p-2 rounded-full">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">리뷰 작성</p>
                <p className="text-xs text-gray-500">다른 사람들과 맛집 정보를 공유해보세요</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="bg-green-500 p-2 rounded-full">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">예약 기능</p>
                <p className="text-xs text-gray-500">미리 예약하고 대기시간을 줄여보세요</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <div className="bg-purple-500 p-2 rounded-full">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">가게 문의</p>
                <p className="text-xs text-gray-500">사장님과 직접 소통하며 궁금한 점을 해결하세요</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <Gift className="w-4 h-4 text-orange-500" />
              <p className="text-sm font-medium text-orange-800">특별 혜택</p>
            </div>
            <p className="text-xs text-orange-700">
              로그인하시면 새로운 가게 오픈 알림과 특별 할인 정보를 받을 수 있어요!
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={onCancel} 
              variant="outline" 
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              나중에
            </Button>
            <Button 
              onClick={onLogin} 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              로그인하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPrompt;
