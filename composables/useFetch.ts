import { BASE_URL } from "~/configs/api.config";
import { FetchError, FetchOptions } from "ofetch";
import { FetchCustomConfig } from "~/types/fetch";
import { useAuthStore } from "~/store/Auth.store";

export const useFetchData = <R, T>() => {
  const authStore = useAuthStore();
  const customFetch = (
    url: string,
    config: FetchOptions,
    customConfig: FetchCustomConfig = {}
  ) => {
    if (customConfig.setToken) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `Bearer ${authStore.getToken}`;
    }
    // @ts-ignore
    return $fetch<T>(url, { baseURL: BASE_URL, ...config })
      .then((res) => res)
      .catch((e) => customConfig?.onError?.(e));
  };

  return customFetch;
};
