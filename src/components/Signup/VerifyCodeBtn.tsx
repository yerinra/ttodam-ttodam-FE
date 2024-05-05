import { Button } from '../ui/button';

type VerifyCodeBtnProps = {
  onClick: () => void;
  disabled: boolean;
};

export default function VerifyCodeBtn({ onClick, disabled }: VerifyCodeBtnProps) {
  return (
    <Button
      type="button"
      className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-3 rounded"
      onClick={onClick}
      disabled={disabled}
    >
      인증
    </Button>
  );
}
