
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, User, Calendar } from "lucide-react";
import { Review } from "@/types/user";

interface ReviewSystemProps {
  storeId: string;
  reviews: Review[];
  onReviewSubmit: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  userRole: 'guest' | 'customer' | 'store';
  userId?: string;
  userName?: string;
}

const ReviewSystem = ({ storeId, reviews, onReviewSubmit, userRole, userId, userName }: ReviewSystemProps) => {
  const [isWriting, setIsWriting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!userId || !userName) return;
    
    onReviewSubmit({
      storeId,
      customerId: userId,
      customerName: userName,
      rating,
      comment,
      images: []
    });
    
    setIsWriting(false);
    setComment("");
    setRating(5);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              리뷰 ({reviews.length})
            </CardTitle>
            {userRole === 'customer' && !isWriting && (
              <Button onClick={() => setIsWriting(true)} size="sm">
                리뷰 작성
              </Button>
            )}
          </div>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= averageRating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                평균 {averageRating.toFixed(1)}점
              </span>
            </div>
          )}
        </CardHeader>
        
        {isWriting && (
          <CardContent className="border-t">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">평점</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">리뷰 내용</label>
                <Textarea
                  placeholder="이 가게에 대한 솔직한 후기를 남겨주세요..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSubmit} disabled={!comment.trim()}>
                  리뷰 등록
                </Button>
                <Button variant="outline" onClick={() => setIsWriting(false)}>
                  취소
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-sm">{review.customerName}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {review.createdAt.toLocaleDateString('ko-KR')}
                </div>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        
        {reviews.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSystem;
