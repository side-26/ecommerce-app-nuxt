import { BASE_URL } from "~/configs/api.config";
import { FetchError, FetchOptions } from "ofetch";
import { FetchCustomConfig } from "~/types/fetch";
import { useAuthStore } from "~/store/Auth.store";

export const useFetchData = <R, T>() => {
  const authStore = useAuthStore();
  const { addNewToast } = useToast();
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
      .then((res) => {
        const response = customConfig.beforeResponse
          ? customConfig.beforeResponse(res)
          : res;
        return response;
      })
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
        const toastValidation = (errorFields: string[]) => {
          errorFields?.forEach((errField) => {
            if (getValidationErrors()[errField])
              addNewToast(getValidationErrors()[errField], "error");
          });
        };
        if (e.response && e.response.status == 422) {
          if (customConfig.setErrors)
            customConfig.setErrors(getValidationErrors());

          if (customConfig.onValidationFailed)
            customConfig.onValidationFailed(getValidationErrors(), e);
          if (customConfig?.toastValidationFields?.length)
            toastValidation(customConfig?.toastValidationFields);
        } else if (e.response && e.response.status) {
          showError({
            statusCode: e.response.status,
            statusMessage: e?.response?._data?.message,
          });
        }
      });
  };

  return customFetch;
};
