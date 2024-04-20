import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import sendAuthenticationCode from '@/apis/signup/sendAuthenticationCode'
import verifyAuthenticationCode from '@/apis/signup/verifyAuthenticationCode';

interface FormValues {
  email: string;
  authenticationCode: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormValues>();

  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("/api/signup", data);
      if (response.status === 200) {
        console.log("회원가입 성공");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const requestAuthenticationCode = async (email: string) => {
    try {
      await sendAuthenticationCode(email);
      setIsCodeRequested(true);
    } catch (error) {
      console.error("인증코드 요청에 실패했습니다:", error);
      setError("email", {
        type: "manual",
        message: "인증코드 요청에 실패했습니다",
      });
    }
  };

  const verifyCodeAndSignUp = async (code: string) => {
    try {
      await verifyAuthenticationCode(code);
      setIsCodeVerified(true);
    } catch (error) {
      console.error("인증코드 확인에 실패했습니다:", error);
      setError("authenticationCode", {
        type: "manual",
        message: "인증코드 확인에 실패했습니다",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <div className="relative w-96 mb-6">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "올바른 이메일 형식이 아닙니다.",
            },
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.email ? "border-red-500" : ""
          }`}
        />
        {!isCodeRequested && (
          <button
            type="button"
            className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-2 rounded"
            onClick={() => requestAuthenticationCode(watch("email"))}
            disabled={isCodeRequested}
          >
            이메일 인증
          </button>
        )}
      </div>
      {errors && errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}

      {isCodeRequested && (
        <div className="relative w-96 mb-6">
          <input
            type="text"
            placeholder="인증코드를 입력하세요"
            {...register("authenticationCode", {
              required: "인증코드를 입력하세요.",
            })}
            className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
              errors && errors.authenticationCode ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-3 rounded"
            onClick={() => verifyCodeAndSignUp(watch("authenticationCode"))}
            disabled={isCodeVerified}
          >
            인증
          </button>
        </div>
      )}
      {errors && errors.authenticationCode && (
        <span className="text-red-500 text-sm">
          {errors.authenticationCode.message}
        </span>
      )}

      <div className="relative w-96 mb-6">
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          {...register("nickname", {
            required: "닉네임을 입력하세요.",
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.nickname ? "border-red-500" : ""
          }`}
        />
      </div>
      {errors && errors.nickname && (
        <span className="text-red-500 text-sm">{errors.nickname.message}</span>
      )}

      <div className="relative w-96 mb-6">
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          {...register("password", {
            required: "비밀번호를 입력하세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.password ? "border-red-500" : ""
          }`}
        />
      </div>

      {errors && errors.password && (
        <span className="text-red-500 text-sm mb-4">
          {errors.password.message}
        </span>
      )}

      <div className="relative w-96 mb-6">
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("confirmPassword", {
            required: "비밀번호 확인을 입력하세요.",
            validate: (value) =>
              value === "" ||
              value === password ||
              "비밀번호가 일치하지 않습니다.",
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.confirmPassword ? "border-red-500" : ""
          }`}
        />
      </div>

      {errors && errors.confirmPassword && (
        <span className="text-red-500 text-sm mb-4">
          {errors.confirmPassword.message}
        </span>
      )}

      <button
        type="submit"
        className="bg-primary text-white px-10 py-4 rounded w-96 mb-3"
      >
        가입하기
      </button>
    </form>
  );
};

export default SignUpForm;
