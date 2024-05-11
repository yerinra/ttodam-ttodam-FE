import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import H1 from '@/components/atoms/H1';
import getKeywords from '@/apis/keyword/getKeywords';
import useKeywords from '@/hooks/queries/useKeywords';

import { Input } from '@/components/ui/input';
import Loading from '@/components/atoms/Loading';
import Error from '@/components/atoms/Error';
import KeywordItem from '@/components/keywordPage/KeywordItem';
import { type Keyword } from '@/types/keyword';

const KeywordPage = () => {
  const [inputKeyword, setInputKeyword] = useState<string>('');
  const [editingKeywordId, setEditingKeywordId] = useState<number | null>(null);
  const [editedKeyword, setEditedKeyword] = useState<string>('');

  const { data, error, isLoading } = useQuery<Keyword[]>({
    queryFn: getKeywords,
    queryKey: ['keywords'],
  });

  const { mutation, deleteMutation, addMutation } = useKeywords();

  const handleDelete = (keywordId: number) => {
    const confirmed = window.confirm('키워드를 삭제하시겠습니까?');
    if (confirmed) deleteMutation.mutate(keywordId);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKeyword(event.target.value);
  };

  const handleAddKeyword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputKeyword.trim() !== '') {
      const newKeywordName = inputKeyword.trim();
      addMutation.mutate(newKeywordName);
      setInputKeyword('');
    }
  };

  const handleEditClick = (keywordId: number, keywordName: string) => {
    setEditingKeywordId(keywordId);
    setEditedKeyword(keywordName);
  };

  const handleInputBlur = () => {
    if (editedKeyword.trim() === '') {
      setEditedKeyword(data!.find(keyword => keyword.id === editingKeywordId)?.keywordName || '');
    } else {
      mutation.mutate({ keywordId: editingKeywordId as number, newKeywordName: editedKeyword });
    }
    setEditingKeywordId(null);
  };

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <H1>나의 키워드</H1>

      <ul className="my-5">
        {data &&
          data.map(keyword => (
            <KeywordItem
              key={keyword.id}
              keyword={keyword}
              editingKeywordId={editingKeywordId}
              editedKeyword={editedKeyword}
              setEditedKeyword={setEditedKeyword}
              onEdit={() => handleEditClick(keyword.id, keyword.keywordName)}
              onDelete={() => handleDelete(keyword.id)}
              handleInputBlur={handleInputBlur}
            />
          ))}
      </ul>
      <form className="mt-auto" onSubmit={handleAddKeyword}>
        <Input
          type="text"
          placeholder="알림을 받을 키워드를 입력하세요"
          value={inputKeyword}
          onChange={handleInputChange}
        />
      </form>
    </>
  );
};

export default KeywordPage;
