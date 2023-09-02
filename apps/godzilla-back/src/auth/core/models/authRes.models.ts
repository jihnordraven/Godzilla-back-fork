export type LoginResType = {
  accessToken: string;
  user: userInfo;
};

type userInfo = {
  userId: string;
  username: string;
  email: string;
  createdAt: string;
};
