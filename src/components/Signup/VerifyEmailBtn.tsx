import { Button } from '../ui/button';

type VerifyEmailBtnProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function VerifyEmailBtn({ onClick, disabled }: VerifyEmailBtnProps) {
  return (
    <Button
      type="button"
      className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-2 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      이메일 인증
    </Button>
  );
}
