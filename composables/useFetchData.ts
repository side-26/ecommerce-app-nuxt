import { BASE_URL } from "~/configs/api.config";
import { FetchError, type FetchOptions } from "ofetch";
import type { FetchCustomConfig } from "~/types/fetch";
import { useAuthStore } from "~/store/Auth.store";

export const useFetchData = <R, T>() => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { addNewToast } = useToast();
  const customFetch = (
    url: string,
    config: FetchOptions,
    customConfig: FetchCustomConfig = {}
  ) => {
    config = { baseURL: BASE_URL, retry: 0, ...config };
    customConfig = { goToLogin: true, toastError: true, ...customConfig };
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
        if (customConfig.ignoreErrors) {
          return;
        }
        const { clearStore } = useAuthStore();
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
        } else if (response && response.status === 401) {
          return handleRefreshToken(e, url, config, customConfig)?.catch(
            (e) => {
              clearStore();
              goToLogin(customConfig);
            }
          ) as unknown as R;
        } else {
          const errorTxt =
            response?.statusText ||
            response?._data?.message ||
            "خطای دریافت اطلاعات از سرور";
          const errStatusCode = response?.status || 500;
          if ((config.method || "").toLowerCase() == "get" || !config.method)
            showError({
              statusCode: errStatusCode,
              statusMessage: errorTxt,
            });
          else if (customConfig.toastError) addNewToast(errorTxt, "error");
        }
      });
  };
  function goToLogin(fetchCustomConfig: FetchCustomConfig) {
    if (fetchCustomConfig.goToLogin !== false) {
      router.replace("/?need_auth=true");
    }
  }
  async function handleRefreshToken(
    e: FetchError,
    url: string,
    config: FetchOptions,
    customConfig: FetchCustomConfig
  ) {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
      return new Promise((_, reject) => {
        reject(e);
      });
    }
    if (!authStore.isRefreshing && !authStore.isRefreshSuccess) {
      authStore.doRefreshToken();
    }

    return new Promise((resolve, reject) => {
      if (authStore.isRefreshSuccess) {
        resolve(customFetch(url, config, customConfig));
      } else {
        watch(
          () => authStore.isRefreshing,
          (isRefreshing) => {
            if (isRefreshing == false) {
              if (authStore.isRefreshSuccess) {
                resolve(customFetch(url, config, customConfig));
              } else {
                reject(e);
              }
            }
          }
        );
      }
    });
  }
  return customFetch;
};
