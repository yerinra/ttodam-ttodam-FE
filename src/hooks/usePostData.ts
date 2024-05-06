/* eslint-disable react-hooks/exhaustive-deps */
import { axiosAccessFn } from '@/apis/apiClient';
import { categoryNameKR } from '@/lib/utils';
import { Category, PostPreview, StatusFilter } from '@/types/post';
import { useEffect, useState } from 'react';

type usePostDataProps = {
  view: 'listView' | 'searchView';
  selectedCategory: string;
  setStartPage: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedSort: 'createdAt' | 'title';
  selectedFilter: StatusFilter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
  setFilteredAndSortedPosts: React.Dispatch<React.SetStateAction<PostPreview[]>>;
};

export default function usePostData({
  view,
  selectedCategory,
  setSelectedFilter,
  setStartPage,
  setCurrentPage,
  selectedSort,
  selectedFilter,

  setFilteredAndSortedPosts,
}: usePostDataProps) {
  const axiosAccess = axiosAccessFn();
  const [data, setData] = useState<PostPreview[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          selectedCategory === 'all'
            ? '/post/list'
            : `/post/category/${categoryNameKR(selectedCategory?.toUpperCase() as Exclude<Category, 'ALL'>)}`;
        const response = await axiosAccess({
          method: 'get',
          url: apiUrl,
        });
        setData(response.data || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    setStartPage(1);
    setCurrentPage(1);
    setSelectedFilter('ALL');
    if (view === 'listView') fetchData();
  }, [selectedCategory, view]);

  useEffect(() => {
    const sorted = data.filter(v => {
      if (selectedFilter == 'ALL') return v;
      else return v.status == selectedFilter;
    });
    if (selectedSort === 'title') {
      sorted.sort((x, y) => {
        if (x.title > y.title) return 1;
        else if (x.title === y.title) return 0;
        else return -1;
      });
    } else {
      sorted.sort((x, y) => {
        if (x.createdAt > y.createdAt) return 1;
        else if (x.createdAt === y.createdAt) return 0;
        else return -1;
      });
    }
    setFilteredAndSortedPosts(sorted);
    setCurrentPage(1);
    setStartPage(1);
  }, [data, selectedSort, selectedFilter]);
  return { data, setData };
}
