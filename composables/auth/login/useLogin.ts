import { useLoginService } from "./useLogin.service";
import type { LoginValues } from "~/types/auth/login";
import { useAuthStore } from "~/store/Auth.store";
export const useLogin = () => {
  const submitting = ref<boolean>(false);
  const error = ref<string>("");
  const { loginService } = useLoginService();
  const authStore = useAuthStore();
  const onLoginErr = (e) => {
    const { code, status } = e?.response?._data!;
    if (code === 0 && status === 401)
      error.value = "نام کاربری یا کلمه عبور اشتباه است";
  };
  const login = (values: LoginValues) => {
    submitting.value = true;
    error.value = "";
    loginService(values, { onError: onLoginErr })
      .then((res) => {
        if (res !== undefined) {
          authStore.setToken({
            accessToken: res!.access_token,
            expiresIn: res!.expires_in,
            refreshToken: res!.refresh_token,
          });
          authStore.setIdentity(res.identity);
        }
      })
      .catch((e: { code: number; message: string; status: number }) =>
        onLoginErr(e)
      )
      .finally(() => (submitting.value = false));
  };
  return { login, submitting, error,  };
};
