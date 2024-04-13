import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Post } from '@/lib/types';
import axios from 'axios';

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

  return <section>{data && data?.title}</section>;
}
