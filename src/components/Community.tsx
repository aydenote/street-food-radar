
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Heart, MessageCircle, User, Store, Home } from "lucide-react";
import { CommunityPost, UserRole } from "@/types/user";
import CommunityPostForm from "./CommunityPostForm";
import PostDetailModal from "./PostDetailModal";

interface CommunityProps {
  posts: CommunityPost[];
  onPostCreate: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'comments'>) => void;
  onPostLike: (postId: string) => void;
  onAddComment: (postId: string, comment: string) => void;
  onGoHome: () => void;
  userRole: UserRole;
  userId: string;
  userName: string;
}

const Community = ({ posts, onPostCreate, onPostLike, onAddComment, onGoHome, userRole, userId, userName }: CommunityProps) => {
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePostClick = (post: CommunityPost) => {
    if (userRole !== 'guest') {
      setSelectedPost(post);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onGoHome}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            홈으로
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">길거리 음식 커뮤니티</h1>
        </div>
        {userRole !== 'guest' && (
          <Button
            onClick={() => setShowPostForm(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            글쓰기
          </Button>
        )}
      </div>

      {userRole === 'guest' && (
        <Card className="mb-6 bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <p className="text-orange-700 text-center">
              커뮤니티 기능을 이용하려면 로그인이 필요합니다.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <Card 
            key={post.id} 
            className={`hover:shadow-md transition-shadow ${userRole !== 'guest' ? 'cursor-pointer' : ''}`}
            onClick={() => handlePostClick(post)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      {post.authorRole === 'store' ? (
                        <Store className="w-4 h-4 mr-1" />
                      ) : (
                        <User className="w-4 h-4 mr-1" />
                      )}
                      <span>{post.authorName}</span>
                      <Badge 
                        variant="outline" 
                        className="ml-2 text-xs"
                      >
                        {post.authorRole === 'store' ? '사장님' : '고객'}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                </div>
                {post.storeName && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    {post.storeName}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{post.content}</p>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPostLike(post.id);
                  }}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  disabled={userRole === 'guest'}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </Button>
                <div className="flex items-center text-gray-500">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments.length}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showPostForm && userRole !== 'guest' && (
        <CommunityPostForm
          onClose={() => setShowPostForm(false)}
          onSubmit={(postData) => {
            onPostCreate({
              ...postData,
              authorId: userId,
              authorName: userName,
              authorRole: userRole
            });
            setShowPostForm(false);
          }}
          userRole={userRole}
        />
      )}

      {/* 게시글 상세보기 모달 */}
      {selectedPost && userRole !== 'guest' && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onPostLike={onPostLike}
          onAddComment={onAddComment}
          userRole={userRole}
          userId={userId}
          userName={userName}
        />
      )}
    </div>
  );
};

export default Community;
