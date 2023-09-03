export type AuthObjectType = {
  ip: string;
  nameDevice: string;
  userID: string;
};

export type TokensObjectType = {
  refreshToken: string;
  accessToken: string;
  userInfo: {
    id: string;
    username: string;
    email: string;
  };
};

export type SessionsBaseAndUserType = {
  user: InfoUserType;
  id: string;
  ip: string;
  title: string;
  sessionExpired: string;
  createdAt: Date;
  userOwnerId: string;
};

type InfoUserType = {
  id: string;
  username: string;
  email: string;
};
