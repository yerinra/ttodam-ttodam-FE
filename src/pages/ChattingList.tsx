import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatRoomList, ChatRoom } from '@/apis/chatting/chat';

const ChattingList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const rooms = await getChatRoomList();
        setChatRooms(rooms);
      } catch (error) {
        console.error('Error fetching chat room list:', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div className="min-h-screen w-full h-full">
      <div className="max-w-screen-lg max-h-screen-lg mx-auto p-20 mt-20">
        <div className="flex justify-center border-b-2 pb-4 mb-4">
          <h2 className="text-xl font-sans font-bold">채팅방 목록</h2>
        </div>
        <ul className="mb-6 mt-2">
          {chatRooms.map(chatRoom => (
            <li key={chatRoom.id} className="flex justify-between items-center border-b py-10 hover:bg-gray-100">
              <div>
                <h3 className="text-lg font-semibold">{chatRoom.name}</h3>
                <p className="text-sm">{chatRoom.description}</p>
              </div>
              <Link to={`/chatting/${chatRoom.id}`}>
                <button className="bg-primary text-white py-2 px-4 rounded mt-4">채팅</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChattingList;
