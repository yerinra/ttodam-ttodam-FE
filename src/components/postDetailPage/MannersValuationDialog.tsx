import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import ListItemContainer from '../atoms/ListItemContainer';
import { useEffect, useState } from 'react';
import { UserRequest } from '@/types/post';

import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putValuation } from '@/apis/post/valuation';

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
  // const usersToValuate = requestList.filter(user => user.requestStatus == 'ACCEPT')
  const { currentPostId } = useCurrentPostIdStore();
  const usersToValuate = requestList;
  const [valuations, setValuations] = useState<{ id: number; manners: number }[]>([]);
  useEffect(() => {
    console.log(valuations);
  }, [valuations]);
  const handleValuationChange = (memberId: number, count: number) => {
    setValuations(prevValuations => {
      const existingValuationIndex = prevValuations.findIndex(valuation => valuation.id === memberId);
      if (existingValuationIndex !== -1) {
        // 이미 존재하는 경우, 업데이트
        const updatedValuations = [...prevValuations];
        updatedValuations[existingValuationIndex].manners = count;
        return updatedValuations;
      } else {
        // 새로 추가
        return [...prevValuations, { id: memberId, manners: count }];
      }
    });
  };
  const useMannersValuationMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ memberId, postId, manners }: { memberId: number; postId: number; manners: number }) =>
        putValuation(memberId, postId, manners),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['post', currentPostId] });
        location.href = `/post/${currentPostId}`;
      },
      onError: error => {
        console.error('매너 평가를 처리하는 동안 오류가 발생했습니다:', error);
      },
    });
  };
  const mutatePostValuation = useMannersValuationMutation();

  const handleSubmit = async () => {
    try {
      await Promise.all(
        valuations.map(valuation =>
          mutatePostValuation.mutateAsync({
            memberId: valuation.id,
            postId: currentPostId as number,
            manners: valuation.manners,
          }),
        ),
      );
      console.log('매너 평가가 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('매너 평가를 처리하는 동안 오류가 발생했습니다:', error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>함께한 참여자 매너평가</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>매너점수 평가</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-y-2">
          {usersToValuate.map(user => (
            <ListItemContainer key={user.requestId}>
              <div className="flex gap-2">
                {/* <div className="flex gap-2">
                  <div className="w-20">닉네임</div>
                  <div>{user.requestUserNickname}</div>
                </div> */}
                <div>{user.requestUserNickname}</div>
                <div>{user.requestUserManners * 20}점</div>
                {/* <div className="flex gap-2">
                  <div className="w-20">매너점수</div>
                  <div>{user.requestUserManners * 20}점</div>
                </div> */}
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
                      {/* value="default" id="r1"  */}
                      <div className="cursor-pointer">{option.label}</div>
                      {/* <Label htmlFor="r1">Default</Label> */}
                    </div>
                  </RadioGroup>
                ))}
              </ul>
            </ListItemContainer>
          ))}
        </ul>
        <Button className="flex mx-auto" onClick={handleSubmit}>
          평가완료
        </Button>
      </DialogContent>
    </Dialog>
  );
}
