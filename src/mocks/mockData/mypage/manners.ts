export type MannersMockDataType = {
  mannersScore: Manners[];
};

export type Manners = {
  membersId: number;
  nickname: string;
  manners: number;
};

export const MannersMockData = {
  mannersScore: [
    {
      membersId: 2,
      nickname: '홍길동',
      manners: 1,
    },
    {
      membersId: 2,
      nickname: '또담',
      manners: 3,
    },
  ],
};
