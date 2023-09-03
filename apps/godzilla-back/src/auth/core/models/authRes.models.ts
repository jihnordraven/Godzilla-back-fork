export type LoginResType = {
  accessToken: string;
  user: userInfo;
};

type userInfo = {
  id: string;
  username: string;
  email: string;
};
