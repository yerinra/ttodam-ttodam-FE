import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URL}/kakao/login`);
      const { data } = response;
      
      localStorage.setItem("name", data.account.kakaoName);
      
      navigate("/");
    } catch (error) {
      console.error('카카오톡 로그인 실패:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={handleKakaoLogin} className=" bg-yellow-300 text-black px-10 py-4 rounded w-96">
        카카오톡 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
