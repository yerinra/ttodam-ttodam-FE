import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import sendAuthenticationCode from '@/apis/Email_authentication/sendAuthenticationCode';
import verifyAuthenticationCode from '@/apis/Email_authentication/verifyAuthenticationCode';
import { SignUpFormData, SignUpFormValues } from '@/types/auth';
import { signUp } from '@/apis/auth/signup';
import { useNavigate } from 'react-router-dom';
import FormErrorMessage from './FormErrorMessage';
import SignUpBtn from './SignUpBtn';
import ResendCodeBtn from './ResendCodeBtn';
import VerifyCodeBtn from './VerifyCodeBtn';
import Timer from './Timer';
import VerifyEmailBtn from './VerifyEmailBtn';

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<SignUpFormValues>();

  const navigate = useNavigate();

  const CODE_VERIFICATION_TIME = 5 * 60;

  const [timer, setTimer] = useState(CODE_VERIFICATION_TIME);
  const [timerActive, setTimerActive] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    let timeCount: NodeJS.Timeout | undefined;
    if (timerActive && timer > 0) {
      timeCount = setInterval(() => setTimer(timer - 1), 1000);
    }
    if (timer === 0) {
      setTimerExpired(true);
      clearInterval(timeCount);
    }
    return () => clearInterval(timeCount);
  }, [timer, timerActive]);

  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const password = watch('password');

  const onSubmit = async (data: SignUpFormValues) => {
    if (!isCodeVerified) {
      alert('이메일 인증을 진행해주세요!');
      return;
    }

    try {
      const dataToSend: SignUpFormData = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      await signUp(dataToSend);
      reset();
      alert('가입을 환영합니다.');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const requestAuthenticationCode = async (email: string) => {
    try {
      await sendAuthenticationCode(email);

      setIsCodeRequested(true);
      setTimer(CODE_VERIFICATION_TIME);
      setTimerActive(true);
      setTimerExpired(false);
      clearErrors('email');
      clearErrors('authenticationCode');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: '인증코드 요청에 실패했습니다',
      });
      setTimerActive(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      await verifyAuthenticationCode(email, code);
      setIsCodeVerified(true);
      setTimerActive(false);
      setTimerExpired(false);

      clearErrors('authenticationCode');
    } catch (error) {
      setIsCodeVerified(false);
      setTimerActive(false);
      setTimerExpired(true);
      console.error('인증코드 확인에 실패했습니다:', error);
      setError('authenticationCode', {
        type: 'manual',
        message: '인증코드 확인에 실패했습니다',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="relative w-96 mb-6">
        <input
          type="email"
          placeholder="이메일"
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          })}
          className={`border-b bg-white border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.email ? 'border-red-500' : ''
          }`}
        />
        {!isCodeRequested && (
          <VerifyEmailBtn onClick={() => requestAuthenticationCode(watch('email'))} disabled={isCodeRequested} />
        )}
      </div>
      {errors && errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}

      {isCodeRequested && (
        <div className="relative w-96 mb-6">
          <input
            type="text"
            placeholder="인증코드를 입력하세요"
            {...register('authenticationCode', {
              required: '인증코드를 입력하세요.',
            })}
            className={`border-b bg-white border-gray-500 focus:outline-none w-full py-4 pr-16 ${
              errors && errors.authenticationCode ? 'border-red-500' : ''
            }`}
          />
          <div>
            {timerActive && <Timer timer={timer} />}
            {!timerExpired ? (
              <VerifyCodeBtn
                onClick={() => verifyCode(watch('email'), watch('authenticationCode'))}
                disabled={isCodeVerified}
              />
            ) : (
              <ResendCodeBtn onClick={() => requestAuthenticationCode(watch('email'))} />
            )}
          </div>
        </div>
      )}
      {errors && errors.authenticationCode && <FormErrorMessage>{errors.authenticationCode.message}</FormErrorMessage>}

      <div className="relative w-96 mb-6">
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', {
            required: '비밀번호를 입력하세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.password ? 'border-red-500' : ''
          }`}
        />
      </div>

      {errors && errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}

      <div className="relative w-96 mb-6">
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register('confirmPassword', {
            required: '비밀번호 확인을 입력하세요.',
            validate: value => value === '' || value === password || '비밀번호가 일치하지 않습니다.',
          })}
          className={`border-b border-gray-500 focus:outline-none w-full py-4 pr-16 ${
            errors && errors.confirmPassword ? 'border-red-500' : ''
          }`}
        />
      </div>

      {errors && errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}

      <SignUpBtn disabled={!isCodeRequested || !isCodeVerified} />
    </form>
  );
};

export default SignUpForm;
