import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URL}/google/login`);
      const { data } = response;
      
      localStorage.setItem("name", data.account.googleName);
      
      navigate("/");
    } catch (error) {
      console.error('구글 소셜 로그인 실패:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={handleGoogleLogin} className="bg-white border-black text-black border border-solid px-10 py-4 rounded w-96">
        구글 로그인
      </button>
    </div>
  );
};

export default GoogleLogin;
