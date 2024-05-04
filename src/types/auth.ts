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
  password: string;
  confirmPassword: string;
}

export type LoginFormValues = {
  email: string;
  password: string;
};
