import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
 
interface ChatRoom {
  roomId: string;
  title: string;
  productName: string;
}

const ChattingList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const tempChatRooms: ChatRoom[] = [
    { roomId: '1', title: '게시글 제목', productName: '제품명' },
    { roomId: '1', title: '게시글 제목', productName: '제품명' },

  ];

  useEffect(() => {
    setChatRooms(tempChatRooms);
  }, []);

  return (
    <div className="min-h-screen w-full h-full">
      <div className="max-w-screen-lg max-h-screen-lg mx-auto p-20 mt-20">
        <div className="flex justify-center border-b-2 pb-4 mb-4">
          <h2 className="text-xl font-sans font-bold">채팅방 목록</h2>
        </div>
        <ul className="mb-6 mt-2">
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.roomId} className="flex justify-between items-center border-b py-10 hover:bg-gray-100">
              <div>
                <h3 className="text-lg font-semibold">{chatRoom.title}</h3>
                <p className="text-sm">{chatRoom.productName}</p>
              </div>
              {/* 임시 채팅방 경로 */}
              <Link to = '/chatting'> 
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