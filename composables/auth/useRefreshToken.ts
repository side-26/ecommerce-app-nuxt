import { useAuthStore } from "~/store/Auth.store";
import { useRefreshTokenService } from "./useRefreshToken.service";

export const useRefreshToken = () => {
  const doRefreshTokenService = (refreshToken: string) => {
    console.log("this is refreshTokken", refreshToken);
  };
  return doRefreshTokenService;
};
