
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, User, Store } from "lucide-react";

interface ChatWindowProps {
  userRole: 'customer' | 'store' | 'guest';
  storeName?: string;
}

interface Message {
  id: string;
  sender: 'customer' | 'store';
  content: string;
  timestamp: Date;
  senderName: string;
}

const ChatWindow = ({ userRole, storeName }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'customer',
      content: '안녕하세요! 붕어빵 아직 남아있나요?',
      timestamp: new Date(Date.now() - 300000),
      senderName: '김고객'
    },
    {
      id: '2',
      sender: 'store',
      content: '네, 안녕하세요! 붕어빵 많이 남아있습니다. 몇 개 필요하세요?',
      timestamp: new Date(Date.now() - 240000),
      senderName: '할머니 붕어빵'
    },
    {
      id: '3',
      sender: 'customer',
      content: '5개 정도 사고 싶은데, 지금 가면 바로 살 수 있을까요?',
      timestamp: new Date(Date.now() - 180000),
      senderName: '김고객'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('store1');

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      sender: userRole === 'store' ? 'store' : 'customer',
      content: newMessage,
      timestamp: new Date(),
      senderName: userRole === 'store' ? (storeName || '내 가게') : '나'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // 가게 운영자용 채팅 목록
  if (userRole === 'store') {
    const chatList = [
      { id: 'customer1', name: '김고객', lastMessage: '5개 정도 사고 싶은데...', time: '14:23', unread: 2 },
      { id: 'customer2', name: '이손님', lastMessage: '호떡도 파시나요?', time: '13:45', unread: 0 },
      { id: 'customer3', name: '박고객', lastMessage: '몇 시까지 하세요?', time: '13:12', unread: 1 },
    ];

    return (
      <div className="flex h-96 border rounded-lg overflow-hidden">
        {/* 채팅 목록 */}
        <div className="w-1/3 bg-gray-50 border-r">
          <div className="p-3 border-b bg-white">
            <h3 className="font-medium text-gray-800">고객 문의</h3>
          </div>
          <div className="overflow-y-auto h-full">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                  selectedChat === chat.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{chat.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{chat.time}</span>
                    {chat.unread > 0 && (
                      <Badge className="bg-orange-500 text-white text-xs px-1.5 py-0.5 min-w-5 h-5 rounded-full flex items-center justify-center">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          <div className="p-3 border-b bg-white">
            <h4 className="font-medium">김고객</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'store' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'store'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'store' ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 고객용 단일 채팅
  return (
    <Card className="h-96">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Store className="w-5 h-5" />
          <span>{storeName || '가게와의 대화'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full pb-0">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.sender === 'customer'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'customer' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 pt-3 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
