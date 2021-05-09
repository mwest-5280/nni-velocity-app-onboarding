export interface IAuthorizationToken {
  accessToken: string;
  expiresIn: number;
  issuedAt: number;
  tokenType: string;
}
