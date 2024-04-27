export type UserInfo = {
  id: number;
  email?: string;
  profileImgUrl?: string;
  nickname?: string;
  location?: string;
  manners?: number;
};

export interface signUpFormData {
  email: string;
  nickname: string;
  password: string;
}
