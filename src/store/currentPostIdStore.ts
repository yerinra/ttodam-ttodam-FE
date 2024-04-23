import { create } from 'zustand';

type CurrentPostIdStore = {
  currentPostId: number | null;
  setCurrentPostId: (postId: number | null) => void;
};
const useCurrentPostIdStore = create<CurrentPostIdStore>(set => ({
  currentPostId: null,
  setCurrentPostId: (postId: number | null) => set({ currentPostId: postId }), // 현재 포스트의 ID를 설정하는 액션
}));

export default useCurrentPostIdStore;
