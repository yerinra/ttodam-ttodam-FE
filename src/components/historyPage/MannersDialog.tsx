import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useState } from 'react';
import { postManners } from '@/apis/myPage/manners';
import { useQuery } from '@tanstack/react-query';

import { FaStar } from 'react-icons/fa';
import { type Manners } from '@/mocks/mockData/mypage/manners';

type MannersDialogProps = {
  data: Manners[];
};

export default function MannersDialog({ data }: MannersDialogProps) {
  const [score, setScore] = useState<number[]>(new Array(data.length).fill(0));
  const [scoreFixed, setScoreFixed] = useState<(number | null)[]>(new Array(data.length).fill(null));
  const [clickedStars, setClickedStars] = useState<number[]>(new Array(data.length).fill(0));

  const {
    data: mannersData,
    error,
    isLoading,
  } = useQuery<Manners[]>({
    queryKey: ['manners', data.map(item => item.membersId)],
    queryFn: () => {
      return Promise.all(data.map(item => postManners(item.membersId)));
    },
  });

  const handleStarEnter = (idx: number, listIndex: number) => {
    const newClickedStars = [...clickedStars];
    newClickedStars[listIndex] = idx + 1;
    setClickedStars(newClickedStars);

    const newScore = [...score];
    newScore[listIndex] = idx + 1;
    setScore(newScore);
  };

  const handleStarLeave = (listIndex: number) => {
    if (scoreFixed[listIndex] !== null) {
      const newScore = [...score];
      newScore[listIndex] = clickedStars[listIndex];
      setScore(newScore);
    } else {
      const newScore = [...score];
      newScore[listIndex] = 0;
      setScore(newScore);
    }
  };

  const handleStarClick = (idx: number, listIndex: number) => {
    const newClickedStars = [...clickedStars];
    newClickedStars[listIndex] = idx + 1;
    setClickedStars(newClickedStars);

    const newScoreFixed = [...scoreFixed];
    if (newScoreFixed[listIndex] === null) {
      newScoreFixed[listIndex] = idx + 1;
    } else {
      newScoreFixed[listIndex] = null;
    }

    setScoreFixed(newScoreFixed);

    console.log(newClickedStars);
  };

  const handleEvaluationComplete = () => {
    alert('평가가 완료되었습니다.');
  };

  if (error) return <div>에러가 발생했습니다.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!mannersData) return <div>Loading...</div>;

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
          {mannersData &&
            data.map((manners, index) => (
              <li key={index} className="flex border-b first-of-type:border-t py-2 items-center">
                <section>
                  <div className="flex gap-2 items-center">
                    <div className="text-sm w-14 text-dark-gray">닉네임</div>
                    <div className="font-semibold text-primary">{manners.nickname}</div>
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <div className="text-sm w-14 text-dark-gray">매너점수</div>
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleStarClick(idx, index)}
                          onMouseEnter={() => handleStarEnter(idx, index)}
                          onMouseLeave={() => handleStarLeave(index)}
                          className="mr-3 relative"
                        >
                          {scoreFixed[index] !== null && idx < (scoreFixed[index] as number) ? (
                            <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                          ) : scoreFixed[index] !== null && idx === (scoreFixed[index] as number) - 1 ? (
                            <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                          ) : idx < score[index] ? (
                            <FaStar size={20} color="gold" className="absolute top-[-10px] left-0" />
                          ) : (
                            <FaStar size={20} color="lightGray" className="absolute top-[-10px] left-0" />
                          )}
                        </button>
                      ))}
                  </div>
                </section>
                <div className="ml-auto flex gap-2">
                  <Button type="submit" size={'sm'} onClick={handleEvaluationComplete}>
                    평가 완료
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
