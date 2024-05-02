import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import sendAuthenticationCode from '@/apis/Email_authentication/sendAuthenticationCode';
import verifyAuthenticationCode from '@/apis/Email_authentication/verifyAuthenticationCode';
import { signUpFormData } from '@/types/auth';
import { signUp } from '@/apis/auth/signup';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface FormValues {
  email: string;
  authenticationCode: string;
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
    clearErrors,
    reset,
  } = useForm<FormValues>();
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

  const onSubmit = async (data: FormValues) => {
    if (!isCodeVerified) {
      alert('이메일 인증을 진행해주세요!');
      return; // 인증이 확인되지 않은 경우 회원가입 시도 중지
    }

    try {
      const dataToSend: signUpFormData = {
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
          <Button
            type="button"
            className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-2 rounded"
            onClick={() => requestAuthenticationCode(watch('email'))}
            disabled={isCodeRequested}
          >
            이메일 인증
          </Button>
        )}
      </div>
      {errors && errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

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
            {timerActive && (
              <div className="absolute top-1 right-14  font-bold py-2 px-3 rounded h-[36px] text-sm text-red-500">
                {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}
              </div>
            )}
            {!timerExpired ? (
              <Button
                type="button"
                className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-3 rounded"
                onClick={() => verifyCode(watch('email'), watch('authenticationCode'))}
                disabled={isCodeVerified}
              >
                인증
              </Button>
            ) : (
              <Button
                type="button"
                className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-3 rounded"
                onClick={() => requestAuthenticationCode(watch('email'))}
              >
                재전송
              </Button>
            )}
          </div>
        </div>
      )}
      {errors && errors.authenticationCode && (
        <span className="text-red-500 text-sm">{errors.authenticationCode.message}</span>
      )}

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

      {errors && errors.password && <span className="text-red-500 text-sm mb-4">{errors.password.message}</span>}

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

      {errors && errors.confirmPassword && (
        <span className="text-red-500 text-sm mb-4">{errors.confirmPassword.message}</span>
      )}

      <Button
        type="submit"
        disabled={!isCodeRequested || !isCodeVerified}
        className="bg-primary text-white px-10 py-4 rounded w-96 mb-3 h-[56px] text-md"
      >
        회원가입하기
      </Button>
    </form>
  );
};

export default SignUpForm;
