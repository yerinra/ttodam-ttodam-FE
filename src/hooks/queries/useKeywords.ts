import deleteKeyword from '@/apis/keyword/deleteKeyword';
import registerKeyword from '@/apis/keyword/registerKeyword';
import updateKeyword from '@/apis/keyword/updateKeyword';
import { QueryClient, useMutation } from '@tanstack/react-query';

export default function useKeywords() {
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

  return { addMutation, mutation, deleteMutation };
}
