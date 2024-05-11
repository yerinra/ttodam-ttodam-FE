import { Button } from '../ui/button';

type SignUpBtnProps = {
  disabled: boolean;
};

export default function SignUpBtn({ disabled }: SignUpBtnProps) {
  return (
    <Button type="submit" disabled={disabled} className="w-full py-6 mt-10">
      회원가입하기
    </Button>
  );
}
