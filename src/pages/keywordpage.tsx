import React, { useState } from 'react';
import H1 from '@/components/atoms/H1';
import registerKeyword from '@/apis/keyword/registerKeyword';
import updateKeyword from '@/apis/keyword/updateKeyword';
import deleteKeyword from '@/apis/keyword/deleteKeyword';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import getKeywords from '@/apis/keyword/getKeywords';
import { Keyword } from '@/mocks/mockData/mypage/keywords';
import { Button } from '@/components/ui/button';

const KeywordPage: React.FC = () => {
  const [inputKeyword, setInputKeyword] = useState<string>('');

  const { data, error, isLoading } = useQuery<Keyword[]>({
    queryFn: getKeywords,
    queryKey: ['keywords'],
  });

  const queryClient = new QueryClient();

  const addMutation = useMutation({
    mutationFn: (newKeyword: string) => registerKeyword(newKeyword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  const mutation = useMutation({
    mutationFn: ({ keywordId, newKeywordName }: { keywordId: number; newKeywordName: string }) =>
      updateKeyword(keywordId, newKeywordName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (keywordId: number) => deleteKeyword(keywordId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
  });

  const handleEdit = (keywordId: number, newKeywordName: string) => {
    mutation.mutate({ keywordId, newKeywordName });
  };

  const handleDelete = (keywordId: number) => {
    deleteMutation.mutate(keywordId);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(event.target.value);
  };

  const handleAddKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputKeyword.trim() !== '') {
      const newKeywordName = inputKeyword.trim();
      setInputKeyword('');
      addMutation.mutate(newKeywordName);
    }
  };

  if (isLoading) <div>Loading...</div>;
  if (error) <div>Error</div>;

  return (
    <div className="min-h-screen mx-10">
      <H1>나의 키워드</H1>

      <form className="mt-auto" onSubmit={handleAddKeyword}>
        <input
          type="text"
          placeholder="알림을 받을 키워드를 입력하세요"
          className="border mt-2 border-black rounded-md px-3 py-2 w-full"
          value={inputKeyword}
          onChange={handleInputChange}
        />
        <ul className="mb-6 mt-2">
          {data &&
            data.map(keyword => (
              <li key={keyword.id} className="flex justify-between items-center border-b py-10 hover:bg-gray-100">
                <span>{keyword.keywordName}</span>
                <div className="flex gap-2">
                  <Button
                    // variant="primary"
                    onClick={() => {
                      const newKeywordName = prompt('새로운 키워드를 입력하세요:', keyword.keywordName);
                      if (newKeywordName !== null) {
                        handleEdit(keyword.id, newKeywordName);
                      }
                    }}
                  >
                    수정
                  </Button>
                  <Button variant="secondary" onClick={() => handleDelete(keyword.id)}>
                    삭제
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </form>
    </div>
  );
};

export default KeywordPage;
