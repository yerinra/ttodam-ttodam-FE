import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import useCurrentPostIdStore from '@/store/currentPostIdStore';
import { PURCHASE_STATUS_OPTIONS } from '@/constants/data';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useState } from 'react';
import { PurchaseStatus } from '@/types/post';
import { useChangePurchaseStatusMutation } from '@/hooks/queries/useChangePurchaseStatus';

type PurchaseStatusDialogProps = {
  status: PurchaseStatus;
};

export default function PurchaseStatusDialog({ status }: PurchaseStatusDialogProps) {
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>(status);

  const { currentPostId } = useCurrentPostIdStore();
  const { mutateAsync } = useChangePurchaseStatusMutation(+currentPostId!);

  const handleStatusChange = async () => {
    try {
      await mutateAsync({ postId: currentPostId as number, newPurchaseStatus: purchaseStatus });
      alert('정상적으로 변경되었습니다.');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>진행상태 업데이트</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>진행상태 변경</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-y-2">
          {PURCHASE_STATUS_OPTIONS.map((stat, i) => (
            <RadioGroup defaultValue="comfortable" key={i} onClick={() => setPurchaseStatus(stat.type)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={stat.label} checked={purchaseStatus == stat.type} />
                <div className="cursor-pointer">{stat.label}</div>
              </div>
            </RadioGroup>
          ))}
        </ul>
        <Button onClick={handleStatusChange}>변경완료</Button>
      </DialogContent>
    </Dialog>
  );
}
