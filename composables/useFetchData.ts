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
      .catch((e) => {
        customConfig?.onError?.(e);
        const { response } = e;
        const getValidationErrors = () => {
          const errors = {} as Record<string, string>;
          if (e?.response?._data && Array.isArray(e.response._data)) {
            e.response._data.forEach((item) => {
              errors[item.field] = item.message;
            });
          }
          return errors;
        };
        if (e.response && e.response.status == 422) {
          if (customConfig.setErrors)
            customConfig.setErrors(getValidationErrors());

          if (customConfig.onValidationFailed)
            customConfig.onValidationFailed(getValidationErrors(), e);
        } else if (e.response && e.response.status) {
          showError({ statusCode: e.response.status, statusMessage: e?.response?._data?.message });
        }
      });
  };

  return customFetch;
};
