export type AuthContent = "login" | "register" | "forgetPass";
export interface Token {
  accessToken: string | null;
  expiresIn: number | null;
  tokenType: string | null;
  refreshToken: string | null;
}
export interface Identity {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
}
export interface AuthResponse {
  access_token: string | null;
  expires_in: number | null;
  token_type: string | null;
  refresh_token: string | null;
  identity: Identity;
}
export interface AuthState extends AuthResponse {
  isRefreshing: boolean;
  isRefreshSuccess: boolean;
}
