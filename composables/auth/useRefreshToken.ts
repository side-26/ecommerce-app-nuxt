import { useAuthStore } from "~/store/Auth.store";
import { useRefreshTokenService } from "./useRefreshToken.service";

export const useRefreshToken = () => {
  const authStore = useAuthStore();
  const doRefreshTokenService = useRefreshTokenService();
  const doRefreshToken = () => {
    authStore.toggleRefreshingState(true);
    doRefreshTokenService()
      .then((res) => {
        if (res !== undefined) {
          authStore.setToken(res?.token);
          authStore.toggleSuccessRefreshingState(true);
          return res;
        }
      })
      .finally(() => {
        authStore.toggleRefreshingState(false);
      });
  };
  return doRefreshToken;
};
