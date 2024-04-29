import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RequestInfos = Record<number, { requestId: number | null }>;

type RequestIdStore = {
  requestInfos: RequestInfos;
  setRequestId: (postId: number, requestId: number) => void;
  removeRequestId: (postId: number) => void;
};

const useRequestIdStore = create<RequestIdStore>()(
  persist(
    set => ({
      requestInfos: {},
      setRequestId: (postId, requestId) => {
        set(state => {
          const newState = { ...state.requestInfos };
          delete newState[postId];
          newState[postId] = { requestId };
          return { requestInfos: newState };
        });
      },
      removeRequestId: (postId: number) => {
        // removeRequestId 함수 정의
        set(state => {
          const newState = { ...state.requestInfos };
          delete newState[postId];
          return { requestInfos: newState };
        });
      },
    }),
    {
      name: 'requestIdStore',
    },
  ),
);

export default useRequestIdStore;
