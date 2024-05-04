type NotificationSummaryProps = {
  notificationCount: number;
};

export default function NotificationSummary({ notificationCount }: NotificationSummaryProps) {
  return (
    <div className="flex ml-4 mb-3">
      총 <p className="text-primary ml-1">{notificationCount}</p>건의 알림이 도착했습니다.
    </div>
  );
}
