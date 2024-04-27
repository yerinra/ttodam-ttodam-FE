import React from "react";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";

export default function SocialLogin() {

  return (
    <div className="flex flex-col space-y-4">
      <KakaoLogin />
      <GoogleLogin />
    </div>
  );
}
