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
    // 채팅방에서 받은 새로운 메시지를 처리합니다.
    // 이 함수를 메시지 상태를 올바르게 업데이트하도록 수정할 수 있습니다.
    console.log('새로운 메시지가 도착했습니다:', users);
  };

  const handleMessageSend = () => {
    if (newMessage.trim() === '') return; // 빈 메시지 전송 방지
    if (!chatroomId) return; // 메시지 전송 전에 채팅방 ID가 정의되어 있는지 확인

    const newChatMessage: ChatMessage = {
      type: 'TALK',
      content: newMessage,
      isUser: true, // 사용자 메시지 여부를 추가합니다.
    };

    sendChatMessage(chatroomId, newChatMessage)
      .then(() => {
        setNewMessage('');
      })
      .catch(error => {
        console.error('메시지 전송 중 오류 발생:', error);
        // 오류 처리 - 사용자에게 오류 메시지를 표시합니다.
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-9 border-b">
        <div className="flex flex-col">
          <span className="text-lg font-bold">상품 이름</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-7 ">
        {messages.map((message, index) => (
          <div key={index} className={`flex my-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col items-${message.isUser ? 'end' : 'start'} mr-2`}>
              {!message.isUser && (
                <div className="flex items-center">
                  <span className="text-lg font-semibold">상대방 이름</span>
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
            className=" border-none rounded-md focus:outline-none"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleMessageSend}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
