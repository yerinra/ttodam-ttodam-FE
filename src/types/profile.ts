export type EditProfileToSend = {
  nickname: string;
  password: string;
  confirmPassword: string;
  location: string;
  phone: string;
};

export type Profile = {
  nickname: string;
  profileImageUrl: string;
  manners: number;
};
