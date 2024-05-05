import { Button } from '../ui/button';

type SignUpBtnProps = {
  disabled: boolean;
};

export default function SignUpBtn({ disabled }: SignUpBtnProps) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="bg-primary text-white px-10 py-4 rounded w-96 mb-3 h-[56px] text-md"
    >
      회원가입하기
    </Button>
  );
}
