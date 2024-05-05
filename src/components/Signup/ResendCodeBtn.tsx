import { Button } from '../ui/button';

type ResendCodeBtnProps = {
  onClick: () => void;
};

export default function ResendCodeBtn({ onClick }: ResendCodeBtnProps) {
  return (
    <Button
      type="button"
      className="absolute top-1 right-0 bg-primary text-white font-bold py-2 px-3 rounded"
      onClick={onClick}
    >
      재전송
    </Button>
  );
}
