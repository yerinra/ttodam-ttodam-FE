import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';

import { FaStar } from 'react-icons/fa';

export default function Manners() {
  const [score, setScore] = useState<number>(0);
  const [scoreFixed, setScoreFixed] = useState<number | null>(null);

  const handleStarEnter = (idx: number) => {
    setScore(idx + 1);
  };

  const handleStarLeave = () => {
    if (scoreFixed !== null) {
      setScore(scoreFixed);
    } else {
      setScore(0);
    }
  };

  const handleStarClick = (idx: number) => {
    if (scoreFixed === null) {
      setScoreFixed(idx + 1);
    } else {
      setScoreFixed(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>매너점수 평가하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>함께한 참여자</DialogTitle>
        </DialogHeader>
        <ul>
          <li className="flex border-b first-of-type:border-t py-2 items-center">
            <section>
              <div className="flex gap-2 items-center">
                <div className="text-sm w-14 text-dark-gray">닉네임</div>
                <div className="font-semibold text-primary">홍길동</div>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <div className="text-sm w-14 text-dark-gray">매너점수</div>
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStarClick(idx)}
                      onMouseEnter={() => handleStarEnter(idx)}
                      onMouseLeave={handleStarLeave}
                      className="mr-3 relative"
                    >
                      {scoreFixed !== null && idx < scoreFixed ? (
                        <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                      ) : scoreFixed !== null && idx === scoreFixed - 1 ? (
                        <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                      ) : idx < score ? (
                        <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                      ) : (
                        <FaStar size={20} color="lightGray" className="absolute top-[-10px] left-0" />
                      )}
                    </button>
                  ))}
              </div>
            </section>
            <div className="ml-auto flex gap-2">
              <Button size={'sm'}>평가 완료</Button>
            </div>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
