import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sendChatMessage, loadChatHistory, ChatMessage } from '@/apis/chatting/chat';
import { connectToChatRoom, disconnectFromChatRoom } from '@/apis/chatting/socket';

const ChattingPage: React.FC = () => {
  const { chatroomId } = useParams<{ chatroomId?: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

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

  return (
    <div className="flex flex-col h-screen">
      <div className="p-7">
        <div className="flex items-center justify-between border rounded-md px-4 py-2">
          <input
            type="text"
            className=" border-none rounded-md focus:outline-none w-full"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button className=" bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleMessageSend}>
            전송
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-7">
        {messages.map((message, index) => (
          <div key={index} className={`flex my-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col items-${message.isUser ? 'end' : 'start'} mr-2`}>
              {!message.isUser && (
                <div className="flex items-center">
                  {/* 유저 id 수정 예정 */}
                  <span className="text-lg font-semibold">유저 123</span>
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
    </div>
  );
};

export default ChattingPage;
