/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '../ui/button';
import ListItemContainer from '../atoms/ListItemContainer';
import { useEffect, useState } from 'react';
import { UserRequest } from '@/types/post';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putValuation } from '@/apis/post/valuation';
import Badge from '../atoms/Badge';
import { cn } from '@/lib/utils';

type MannersValuationDialogProps = {
  requestList: UserRequest[];
};

const VALUATION_OPTIONS = [
  { label: '매우 별로', count: 1 },
  { label: '별로', count: 2 },
  { label: '보통', count: 3 },
  { label: '좋음', count: 4 },
  { label: '매우 좋음', count: 5 },
];

export default function MannersValuationDialog({ requestList }: MannersValuationDialogProps) {
  const { currentPostId } = useCurrentPostIdStore();
  const [valuations, setValuations] = useState<{ id: number; manners: number }[]>([]);
  const [allValuated, setAllValuated] = useState(false);
  useEffect(() => {
    if (valuations.length == membersToValuate.length) setAllValuated(true);
  }, [valuations]);

  const membersToValuate = requestList.filter(member => member.requestStatus === 'ACCEPT');
  // const membersToValuate = requestList;
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

  const useMannersValuationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ postId, valuations }: { postId: number; valuations: { userId: number; count: number }[] }) =>
        putValuation(postId, valuations),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });

        console.log('매너 평가가 성공적으로 전송되었습니다.');
      },
      onError: error => {
        console.error('매너 평가를 처리하는 동안 오류가 발생했습니다:', error);
      },
    });
  };

  const mutatePostValuation = useMannersValuationMutation();

  const handleSubmit = async () => {
    const valuatedData = valuations.map(valuation => ({ userId: valuation.id, count: valuation.manners }));
    if (valuatedData.length !== membersToValuate.length) alert('모든 참여자를 평가해주세요.');
    else setAllValuated(true);
    try {
      if (allValuated) {
        await mutatePostValuation.mutateAsync({
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
                    <RadioGroup
                      defaultValue="comfortable"
                      key={option.count}
                      onClick={() => handleValuationChange(user.requestUserId, option.count)}
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem
                          value={option.label}
                          checked={
                            valuations.find(valuation => valuation.id === user.requestUserId)?.manners === option.count
                          }
                        />
                        <div className="cursor-pointer">{option.label}</div>
                      </div>
                    </RadioGroup>
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
