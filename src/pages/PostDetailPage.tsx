import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post } from '@/lib/types';
import axios from 'axios';
import { cn, formatDate } from '@/lib/utils';
import { ClockIcon } from '@radix-ui/react-icons';
import StatusBadge from '@/components/postListPage/StatusBadge';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [data, setData] = useState<Post>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `/post/${postId}`;

        const response = await axios.get(apiUrl);

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <section>
      {data && (
        <div>
          <div className="">
            <div className="flex flex-col gap-2 my-4 py-6 border-slate-200 border-y">
              <StatusBadge status={data.status} variant="detail" />
              <h1 className="font-bold text-3xl">{data.title}</h1>
              <div className="flex gap-2 items-center text-slate-500">
                <ClockIcon />
                {formatDate(data.createAt)}
              </div>
            </div>
            <div>{data.user.nickname}</div>
            <div>{data.user.manners * 20}점</div>
          </div>
          <div>{data.content}</div>
        </div>
      )}
    </section>
  );
}
