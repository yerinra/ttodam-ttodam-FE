import React from 'react';
import { FaArrowLeft, FaUserCircle } from 'react-icons/fa';

interface ChattingPageProps {}

const ChattingPage: React.FC<ChattingPageProps> = ({}) => {
  const messages: { text: string; isUser: boolean }[] = [
    { text: '안녕하세요', isUser: false },
    { text: '...', isUser: false },
    { text: '...', isUser: true },
    { text: '...', isUser: false },
    { text: '...', isUser: true },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-9 border-b">
        <div className="flex items-center mr-7">
          <FaArrowLeft />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold">상품이름</span>
          <div className="flex">
            <span className="mr-2">유저 123</span>
            <span className="mr-2">유저 456</span>
            <span className="mr-2">유저 789</span>
          </div>
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
                <span>{message.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-7">
        <div className="flex items-center justify-between border rounded-md px-4 py-2">
          <input type="text" className=" border-none rounded-md focus:outline-none" />
          <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md">전송</button>
        </div>
      </div>
    </div>
  );
};

export default ChattingPage;
