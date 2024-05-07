export type EditProfileToSend = {
  nickname: string;
  password: string;
  confirmPassword: string;
  location: string;
  phone: string;
};

export type EditProfile = {
  nickname: string;
  profileImgUrl: string;
  password: null;
  confirmPassword: null;
  location?: string;
  phonenumber: string;
};

export type Profile = {
  nickname: string;
  profileImageUrl: string;
  manners: number;
};
