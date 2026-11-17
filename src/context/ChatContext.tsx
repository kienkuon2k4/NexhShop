'use client';

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  senderName: string;
  text: string;
  time: string;
  quickActions?: { label: string; action: string }[];
}

export interface ChatConversation {
  id: string;
  userEmail: string;
  userName: string;
  userRole: 'CUSTOMER' | 'SELLER' | 'ADMIN';
  shopName?: string;
  isConnectingAgent: boolean;
  unreadCountForAdmin: number;
  lastUpdated: string;
  messages: ChatMessage[];
}

interface ChatContextType {
  conversations: ChatConversation[];
  activeConversation: ChatConversation;
  sendMessageFromUser: (text: string) => void;
  sendMessageFromAdmin: (conversationId: string, text: string) => void;
  requestLiveAgent: () => void;
  switchChatModeToBot: () => void;
  markConversationAsReadByAdmin: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'conv-customer-01',
    userEmail: 'customer@nextshop.vn',
    userName: 'Nguyễn Văn Mua (Khách Hàng)',
    userRole: 'CUSTOMER',
    isConnectingAgent: true,
    unreadCountForAdmin: 1,
    lastUpdated: '16:30',
    messages: [
      {
        id: 'msg-1',
        sender: 'bot',
        senderName: 'NextCare Bot',
        text: 'Xin chào anh Mua! Tôi là Trợ lý CSKH tự động NextCare. Tôi có thể hỗ trợ gì cho anh hôm nay?',
        time: '16:25'
      },
      {
        id: 'msg-2',
        sender: 'user',
        senderName: 'Nguyễn Văn Mua',
        text: 'Cho mình hỏi đơn hàng Nồi chiên không dầu Philips của mình khi nào giao tới Cầu Giấy ạ?',
        time: '16:28'
      },
      {
        id: 'msg-3',
        sender: 'user',
        senderName: 'Nguyễn Văn Mua',
        text: 'Mình cần gặp tổng đài viên tư vấn trực tiếp để đổi địa chỉ giao hàng gấp!',
        time: '16:30'
      }
    ]
  },
  {
    id: 'conv-seller-01',
    userEmail: 'seller@nextshop.vn',
    userName: 'Shop Gia Dụng Việt (Chủ Gian Hàng)',
    userRole: 'SELLER',
    shopName: 'Gia Dụng Thông Minh Việt',
    isConnectingAgent: true,
    unreadCountForAdmin: 1,
    lastUpdated: '15:45',
    messages: [
      {
        id: 'msg-s1',
        sender: 'user',
        senderName: 'Shop Gia Dụng Việt',
        text: 'Chào Ban Quản Trị Sàn, shop mình muốn đăng ký tham gia chương trình Flash Sale 11/11 sắp tới thì cần những điều kiện gì ạ?',
        time: '15:45'
      },
      {
        id: 'msg-s2',
        sender: 'agent',
        senderName: 'Quản Trị Viên Sàn',
        text: 'Chào Shop Gia Dụng Việt! Sàn NextShop đã nhận được yêu cầu. Điều kiện Flash Sale: Shop có đánh giá từ 4.8★ trở lên và giảm giá tối thiểu 15%. Shop đủ điều kiện nhé!',
        time: '15:48'
      },
      {
        id: 'msg-s3',
        sender: 'user',
        senderName: 'Shop Gia Dụng Việt',
        text: 'Dạ cảm ơn Ban Quản Trị! Mình vừa thêm 3 sản phẩm nồi chiên và máy lọc không khí vào kho, nhờ Admin duyệt giùm nhé.',
        time: '15:50'
      }
    ]
  }
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>(INITIAL_CONVERSATIONS);

  // Xác định email của phiên làm việc hiện tại
  const currentEmail = currentUser?.email || 'customer@nextshop.vn';

  // Lấy hoặc khởi tạo hội thoại cho user hiện tại
  const existingConv = conversations.find(c => c.userEmail === currentEmail);
  const activeConversation: ChatConversation = existingConv || {
    id: `conv-${currentEmail.replace(/[@.]/g, '-')}`,
    userEmail: currentEmail,
    userName: currentUser?.name || 'Khách Mua Hàng',
    userRole: (currentUser?.role || 'CUSTOMER') as 'CUSTOMER' | 'SELLER' | 'ADMIN',
    shopName: currentUser?.shopInfo?.shopName,
    isConnectingAgent: false,
    unreadCountForAdmin: 0,
    lastUpdated: 'Vừa xong',
    messages: [
      {
        id: 'init-1',
        sender: 'bot',
        senderName: 'NextCare Bot',
        text: `Xin chào ${currentUser ? currentUser.name : 'quý khách'}! 👋\nTôi là Trợ lý CSKH tự động NextCare 24/7. Bạn có thể tra cứu nhanh thông tin hoặc bấm "Chat Với Quản Trị Viên / Tổng Đài Viên" để được hỗ trợ trực tiếp.`,
        time: 'Vừa xong',
        quickActions: [
          { label: '📦 Kiểm tra đơn hàng', action: 'Kiểm tra tình trạng đơn hàng' },
          { label: '🛡️ Chính sách đổi trả', action: 'Chính sách đổi trả 15 ngày' },
          { label: '🏪 Hướng dẫn mở shop', action: 'Hướng dẫn đăng ký mở Shop' }
        ]
      }
    ]
  };

  // Người dùng (Người Mua hoặc Người Bán) gửi tin nhắn
  const sendMessageFromUser = (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      senderName: currentUser?.name || 'Người dùng',
      text: text.trim(),
      time: 'Vừa xong'
    };

    setConversations(prev => {
      const exists = prev.find(c => c.userEmail === currentEmail);
      if (exists) {
        return prev.map(c => {
          if (c.userEmail === currentEmail) {
            return {
              ...c,
              userName: currentUser?.name || c.userName,
              userRole: (currentUser?.role || c.userRole) as 'CUSTOMER' | 'SELLER' | 'ADMIN',
              shopName: currentUser?.shopInfo?.shopName || c.shopName,
              messages: [...c.messages, newMsg],
              unreadCountForAdmin: c.unreadCountForAdmin + 1,
              lastUpdated: 'Vừa xong'
            };
          }
          return c;
        });
      } else {
        const newConv: ChatConversation = {
          ...activeConversation,
          userName: currentUser?.name || activeConversation.userName,
          userRole: (currentUser?.role || activeConversation.userRole) as 'CUSTOMER' | 'SELLER' | 'ADMIN',
          shopName: currentUser?.shopInfo?.shopName,
          messages: [...activeConversation.messages, newMsg],
          unreadCountForAdmin: 1,
          lastUpdated: 'Vừa xong'
        };
        return [newConv, ...prev];
      }
    });

    // Nếu người dùng KHÔNG ở chế độ Live Agent mà đang chat với Bot:
    const isLive = existingConv ? existingConv.isConnectingAgent : activeConversation.isConnectingAgent;
    if (!isLive) {
      setTimeout(() => {
        let botReply = '';
        let actions: { label: string; action: string }[] | undefined = undefined;
        const lower = text.toLowerCase();

        if (lower.includes('đơn hàng') || lower.includes('khi nào giao') || lower.includes('vận chuyển')) {
          botReply = '📦 Đơn hàng tại NextShop giao hỏa tốc 2 giờ nội thành qua NextPass. Bạn cũng có thể bấm nút "Gặp Quản Trị Viên" bên trên để tổng đài viên kiểm tra mã vận đơn giúp bạn ngay lập tức!';
          actions = [
            { label: '🛡️ Kết nối Quản Trị Viên ngay', action: 'CONNECT_AGENT' }
          ];
        } else if (lower.includes('đổi trả') || lower.includes('bảo hành') || lower.includes('lỗi')) {
          botReply = '🛡️ CHÍNH SÁCH BẢO HÀNH CHÍNH HÃNG:\n✓ Đổi mới 1:1 trong 15 ngày đầu.\n✓ Bảo hành chính hãng 12 - 24 tháng.\n✓ Cam kết hoàn tiền 200% nếu phát hiện hàng giả.';
        } else if (lower.includes('mở shop') || lower.includes('bán hàng') || lower.includes('người bán')) {
          botReply = '🏪 ĐĂNG KÝ GIAN HÀNG:\nBạn bấm vào "Kênh Người Bán (Đăng ký mở shop)" trên thanh Header để nộp hồ sơ. Ban Quản Trị sẽ duyệt trong 24h.';
        } else {
          botReply = `NextCare Bot đã ghi nhận câu hỏi: "${text}". Bạn có thể chuyển sang "Chat Trực Tiếp Với Quản Trị Viên" để được nhân viên trực ca phản hồi riêng!`;
          actions = [
            { label: '🛡️ Kết nối Quản Trị Viên / Tổng Đài', action: 'CONNECT_AGENT' }
          ];
        }

        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          senderName: 'NextCare Bot',
          text: botReply,
          time: 'Vừa xong',
          quickActions: actions
        };

        setConversations(prev => prev.map(c => {
          if (c.userEmail === currentEmail) {
            return {
              ...c,
              messages: [...c.messages, botMsg]
            };
          }
          return c;
        }));
      }, 600);
    }
  };

  // Quản Trị Viên / Tổng Đài Viên gửi phản hồi từ Admin Console
  const sendMessageFromAdmin = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const adminMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      senderName: '🛡️ Quản Trị Viên Sàn (Admin Support)',
      text: text.trim(),
      time: 'Vừa xong'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return {
          ...c,
          messages: [...c.messages, adminMsg],
          lastUpdated: 'Vừa xong',
          unreadCountForAdmin: 0
        };
      }
      return c;
    }));
  };

  // Chuyển sang chế độ yêu cầu Chat với Tổng Đài Viên / Quản Trị Viên
  const requestLiveAgent = () => {
    const noticeMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: 'bot',
      senderName: 'Hệ Thống',
      text: '🔔 Đã kết nối với Tổng Đài Quản Trị Viên trực ca! Mọi tin nhắn tiếp theo của bạn sẽ được gửi thẳng đến màn hình Quản Trị Viên Sàn.',
      time: 'Vừa xong'
    };

    setConversations(prev => {
      const exists = prev.find(c => c.userEmail === currentEmail);
      if (exists) {
        return prev.map(c => {
          if (c.userEmail === currentEmail) {
            return {
              ...c,
              isConnectingAgent: true,
              messages: [...c.messages, noticeMsg]
            };
          }
          return c;
        });
      } else {
        const newConv: ChatConversation = {
          ...activeConversation,
          isConnectingAgent: true,
          messages: [...activeConversation.messages, noticeMsg]
        };
        return [newConv, ...prev];
      }
    });
  };

  const switchChatModeToBot = () => {
    setConversations(prev => {
      const exists = prev.find(c => c.userEmail === currentEmail);
      if (exists) {
        return prev.map(c => {
          if (c.userEmail === currentEmail) {
            return {
              ...c,
              isConnectingAgent: false
            };
          }
          return c;
        });
      } else {
        return [{
          ...activeConversation,
          isConnectingAgent: false
        }, ...prev];
      }
    });
  };

  const markConversationAsReadByAdmin = (conversationId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return { ...c, unreadCountForAdmin: 0 };
      }
      return c;
    }));
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      activeConversation,
      sendMessageFromUser,
      sendMessageFromAdmin,
      requestLiveAgent,
      switchChatModeToBot,
      markConversationAsReadByAdmin
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
