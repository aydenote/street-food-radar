
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Heart, MessageCircle, User, Store } from "lucide-react";
import { CommunityPost, UserRole } from "@/types/user";

interface PostDetailModalProps {
  post: CommunityPost;
  onClose: () => void;
  onPostLike: (postId: string) => void;
  userRole: UserRole;
}

const PostDetailModal = ({ post, onClose, onPostLike, userRole }: PostDetailModalProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 z-10 bg-white shadow-md hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>
        
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between pr-8">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold mb-3">{post.title}</CardTitle>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center text-sm text-gray-600">
                    {post.authorRole === 'store' ? (
                      <Store className="w-4 h-4 mr-2" />
                    ) : (
                      <User className="w-4 h-4 mr-2" />
                    )}
                    <span className="font-medium">{post.authorName}</span>
                    <Badge 
                      variant="outline" 
                      className="ml-2 text-xs"
                    >
                      {post.authorRole === 'store' ? '사장님' : '고객'}
                    </Badge>
                  </div>
                  {post.storeName && (
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      {post.storeName}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="prose max-w-none mb-6">
              <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
            
            <div className="flex items-center gap-6 py-4 border-t border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onPostLike(post.id)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-2"
                disabled={userRole === 'guest'}
              >
                <Heart className="w-5 h-5" />
                <span className="font-medium">{post.likes}</span>
                <span className="text-sm">좋아요</span>
              </Button>
              
              <div className="flex items-center gap-2 text-gray-500">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments.length}</span>
                <span className="text-sm">댓글</span>
              </div>
            </div>

            {/* 댓글 섹션 */}
            {post.comments.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-semibold mb-4">댓글 ({post.comments.length})</h3>
                <div className="space-y-4">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{comment.authorName}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailModal;
