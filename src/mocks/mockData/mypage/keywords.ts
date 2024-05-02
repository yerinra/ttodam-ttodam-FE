export type Keyword = {
  id: number;
  userId: number;
  keywordName: string;
};

export type Keywords = Keyword[];

export const keywordsMockData: Keywords = [
  { id: 22, userId: 59, keywordName: '휴지' },
  { id: 23, userId: 59, keywordName: '물티슈' },
];
