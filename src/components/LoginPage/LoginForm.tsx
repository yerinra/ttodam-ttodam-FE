import { useForm } from 'react-hook-form';
import { LoginFormValues } from '@/types/auth';
import useLogin from '@/hooks/queries/useLogin';
import SignUpLink from './SignUpLink';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { mutateAsync } = useLogin();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        {...register('email', {
          required: '이메일을 입력하세요.',
          pattern: {
            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: '이메일 형식이 올바르지 않습니다.',
          },
        })}
        className={`border-b border-gray-500 focus:outline-none w-96 py-4 mb-6 ${errors.email ? 'border-red-500' : ''}`}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        {...register('password', {
          required: '비밀번호를 입력하세요.',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다.',
          },
        })}
        className={`border-b border-gray-500 focus:outline-none w-96 py-4 mb-6 ${
          errors.password ? 'border-red-500' : ''
        }`}
      />
      {errors.password && <span className="text-red-500 text-sm mb-4">{errors.password.message}</span>}

      <SignUpLink />

      <button type="submit" className="bg-primary text-white px-10 py-4 rounded w-96 mb-3">
        로그인
      </button>
    </form>
  );
}
