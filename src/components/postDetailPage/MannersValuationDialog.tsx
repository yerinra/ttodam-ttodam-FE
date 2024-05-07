/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import ListItemContainer from '../atoms/ListItemContainer';
import { useEffect, useState } from 'react';
import { UserRequest } from '@/types/post';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import Badge from '../atoms/Badge';
import { cn } from '@/lib/utils';
import { VALUATION_OPTIONS } from '@/constants/data';
import useMannersValuation from '@/hooks/queries/useMannersValuation';
import ValuationRadioGroup from './ValuationRadioGroup';

type MannersValuationDialogProps = {
  requestList: UserRequest[];
};

export default function MannersValuationDialog({ requestList }: MannersValuationDialogProps) {
  const { currentPostId } = useCurrentPostIdStore();
  const [valuations, setValuations] = useState<{ id: number; manners: number }[]>([]);
  const [allValuated, setAllValuated] = useState(false);

  useEffect(() => {
    if (valuations.length == membersToValuate.length) {
      setAllValuated(true);
    }
  }, [valuations]);

  const membersToValuate = requestList.filter(member => member.requestStatus === 'ACCEPT');
  const handleValuationChange = (memberId: number, count: number) => {
    setValuations(prevValuations => {
      const existingValuationIndex = prevValuations.findIndex(valuation => valuation.id === memberId);
      if (existingValuationIndex !== -1) {
        // 이미 존재하는 경우, 해당 사용자의 매너 평가를 업데이트
        return prevValuations.map(valuation => {
          if (valuation.id === memberId) {
            return { ...valuation, manners: count };
          }
          return valuation;
        });
      } else {
        // 새로운 사용자의 매너 평가를 추가
        return [...prevValuations, { id: memberId, manners: count }];
      }
    });
  };

  const { mutateAsync } = useMannersValuation(currentPostId as number);

  const handleSubmit = async () => {
    const valuatedData = valuations.map(valuation => ({ userId: valuation.id, count: valuation.manners }));
    if (valuatedData.length !== membersToValuate.length) alert('모든 참여자를 평가해주세요.');
    else setAllValuated(true);
    try {
      if (allValuated) {
        await mutateAsync({
          postId: currentPostId as number,
          valuations: valuations.map(valuation => ({ userId: valuation.id, count: valuation.manners })),
        });
        alert('매너평가가 완료되었습니다.');
      }
    } catch (error) {
      console.error('매너 평가를 처리하는 동안 오류가 발생했습니다:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>함께한 참여자 매너평가</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>매너점수 평가</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-y-2">
          {requestList &&
            membersToValuate.map(user => (
              <ListItemContainer key={user.requestId}>
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{user.requestUserNickname}</div>
                  <Badge variant="primary">{user.requestUserManners}점</Badge>
                </div>
                <ul className="flex gap-4">
                  {VALUATION_OPTIONS.map(option => (
                    <ValuationRadioGroup
                      key={option.count}
                      option={option}
                      onClick={() => handleValuationChange(user.requestUserId, option.count)}
                      checked={
                        !!(valuations.find(valuation => valuation.id === user.requestUserId)?.manners === option.count)
                      }
                    />
                  ))}
                </ul>
              </ListItemContainer>
            ))}
        </ul>
        <DialogPrimitive.Close disabled={!allValuated}>
          <div
            className={cn('w-fit flex mx-auto bg-primary disabled:bg-primary/50  text-white rounded-md px-4 py-1', {
              'bg-primary/30': !allValuated,
            })}
            onClick={handleSubmit}
          >
            평가완료
          </div>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}
