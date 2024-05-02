import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { sendChatMessage, loadChatHistory, leaveChatRoom, ChatMessage } from '@/apis/chatting/chat';
import { connectToChatRoom, disconnectFromChatRoom } from '@/apis/chatting/socket';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

const ChattingPage: React.FC = () => {
  const { chatroomId } = useParams<{ chatroomId?: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatHistoryAndConnect = async () => {
      if (!chatroomId) return;

      try {
        const history = await loadChatHistory(chatroomId);
        setMessages(history);
        connectToChatRoom(chatroomId, handleNewMessage);
      } catch (error) {
        console.error('채팅 기록을 불러오는 중 오류 발생:', error);
      }
    };

    fetchChatHistoryAndConnect();

    return () => {
      disconnectFromChatRoom();
    };
  }, [chatroomId]);

  const handleNewMessage = (users: any[]) => {
    console.log('새로운 메시지가 도착했습니다:', users);
  };

  const handleMessageSend = () => {
    if (newMessage.trim() === '') return;
    if (!chatroomId) return;

    const newChatMessage: ChatMessage = {
      type: 'TALK',
      content: newMessage,
      isUser: true,
    };

    sendChatMessage(chatroomId, newChatMessage)
      .then(() => {
        setNewMessage('');
      })
      .catch(error => {
        console.error('메시지 전송 중 오류 발생:', error);
      });
  };

  const handleLeaveChatRoom = () => {
    if (!chatroomId) return;

    leaveChatRoom(chatroomId)
      .then(() => {
        disconnectFromChatRoom();
        navigate('/');
      })
      .catch(error => {
        console.error('채팅방 나가기 중 오류 발생:', error);
      });
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex items-center p-9 border-b">
        <div className="flex items-center mr-7">
          <Link to="/chat">
            <FaArrowLeft />
          </Link>
        </div>
        <div className="flex flex-col">
          {/* 수정중 */}
          <span className="text-lg font-bold">상품이름</span>
          <div className="flex">
            <span className="mr-2">유저 123</span>
            <span className="mr-2">유저 456</span>
            <span className="mr-2">유저 789</span>
          </div>
        </div>
        <div className="flex flex-grow justify-end">
          <button onClick={handleLeaveChatRoom} className="bg-red-500 text-white px-4 py-2 rounded-md">
            나가기
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-7 ">
        {messages.map((message, index) => (
          <div key={index} className={`flex my-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col items-${message.isUser ? 'end' : 'start'} mr-2`}>
              {!message.isUser && (
                <div className="flex items-center">
                  <FaUserCircle size={40} className="text-gray-400 mr-2" />
                  <span className="text-lg font-semibold">유저123</span>
                </div>
              )}
              <div
                className={`rounded-lg p-2 max-w-max ${
                  message.isUser ? 'bg-white-500 border-black border' : 'bg-white-500 border-black border'
                }`}
              >
                <span>{message.content}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-7">
        <div className="flex items-center justify-between border rounded-md px-4 py-2">
          <input
            type="text"
            className=" border-none rounded-md focus:outline-none w-full"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button className=" bg-blue-500 text-white px-4 py-1 rounded-md" onClick={handleMessageSend}>
            1
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
