export type Request = {
  postId: number;
  requestUser: RequestUser;
  requestStatus: 'wait' | 'accept' | 'refuse';
};

export type RequestResponse = {
  participationRequests: Request[];
};

export type RequestUser = {
  id: number;
  nickname: string;
  manners: number;
};

export type RequestStatus = 'wait' | 'accept' | 'refuse';
