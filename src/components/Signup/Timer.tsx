type TimerProps = {
  timer: number;
};

export default function Timer({ timer }: TimerProps) {
  return (
    <div className="absolute top-1 right-14  font-bold py-2 px-3 rounded h-[36px] text-sm text-red-500">
      {`${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}
    </div>
  );
}
