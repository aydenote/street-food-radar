
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { UserRole } from "@/types/user";

interface CommunityPostFormProps {
  onClose: () => void;
  onSubmit: (post: {
    title: string;
    content: string;
    storeId?: string;
    storeName?: string;
  }) => void;
  userRole: UserRole;
}

const CommunityPostForm = ({ onClose, onSubmit, userRole }: CommunityPostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [storeName, setStoreName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      storeName: storeName.trim() || undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>새 글 작성</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="제목을 입력하세요"
                maxLength={100}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none"
                placeholder="내용을 입력하세요"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {content.length}/500
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                관련 가게 (선택사항)
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="가게 이름을 입력하세요"
                maxLength={50}
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button 
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 flex-1"
              >
                작성완료
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityPostForm;
