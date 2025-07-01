
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, User, MapPin } from "lucide-react";

interface LoginTypeSelectorProps {
  onSelectType: (type: 'guest' | 'customer' | 'store') => void;
}

const LoginTypeSelector = ({ onSelectType }: LoginTypeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">길거리 맛집</h1>
          <p className="text-gray-600">어떤 방식으로 이용하시겠어요?</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* 게스트 로그인 */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectType('guest')}>
            <CardHeader className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">게스트로 이용</CardTitle>
              <CardDescription>회원가입 없이 바로 이용</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• 주변 길거리 음식점 찾기</li>
                <li>• 영업 상태 확인</li>
                <li>• 기본 정보 조회</li>
              </ul>
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                게스트로 시작하기
              </Button>
            </CardContent>
          </Card>

          {/* 일반 유저 로그인 */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectType('customer')}>
            <CardHeader className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">일반 회원</CardTitle>
              <CardDescription>더 많은 기능을 이용하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• 게스트 기능 + 추가 혜택</li>
                <li>• 가게와 실시간 채팅</li>
                <li>• 즐겨찾기 및 리뷰</li>
              </ul>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                회원 로그인
              </Button>
            </CardContent>
          </Card>

          {/* 가게 운영자 로그인 */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectType('store')}>
            <CardHeader className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">가게 운영자</CardTitle>
              <CardDescription>내 가게를 등록하고 관리하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• 가게 정보 등록 및 관리</li>
                <li>• 실시간 영업 상태 변경</li>
                <li>• 고객과 소통</li>
              </ul>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                가게 관리하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginTypeSelector;
