import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type CurrentPostIdStore = {
  currentPostId: number | null;
  setCurrentPostId: (postId: number | null) => void;
};
const useCurrentPostIdStore = create<CurrentPostIdStore>()(
  persist(
    set => ({
      currentPostId: null,
      setCurrentPostId: (postId: number | null) => set({ currentPostId: postId }), // 현재 포스트의 ID를 설정하는 액션
    }),
    {
      name: 'currentPostIdInfo', // 로컬 스토리지에 저장할 키 이름
    },
  ),
);

export default useCurrentPostIdStore;
