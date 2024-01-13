import { FetchCustomConfig } from "~/types/fetch";
import { useLoginService } from "./useLogin.service";
import { LoginValues } from "~/types/auth/login";
import { useAuthStore } from "~/store/Auth.store";
import type { AuthResponse } from "~/types/auth";
import { FetchResult } from "nuxt/app";

export const useLogin = () => {
  const submitting = ref<boolean>(false);
  const { loginService } = useLoginService();
  const authStore = useAuthStore();
  const onLoginErr = (e) => {
    console.log(e);
  };
  const login = (values: LoginValues) => {
    submitting.value = true;
    loginService(values, { onError: onLoginErr })
      .then((res) => {
        if (res !== undefined) {
          authStore.setToken({
            accessToken: res!.access_token,
            expiresIn: res!.expires_in,
            refreshToken: res!.refresh_token,
            tokenType: res!.token_type,
          });
          authStore.setIdentity(res.identity);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => (submitting.value = false));
  };
  return { login, submitting };
};
