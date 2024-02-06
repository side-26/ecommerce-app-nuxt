import type { AsyncData, AsyncDataOptions } from "nuxt/app";
import type { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";
import type { NuxtApp } from "nuxt/schema";
export const useAppAsyncData = async <DataT, DataE>(
  key: string,
  handler: (ctx?: NuxtApp | undefined) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
  initialCache: boolean = true
): Promise<AsyncData<DataT, Ref<DataE | null>>> => {
  const nuxtApp = useNuxtApp();
  const { data, error, execute, pending, refresh, status } = useAsyncData<
    DataT,
    DataE
    // @ts-ignore
  >(key, handler, {
    getCachedData(key) {
      if (initialCache)
        return nuxtApp.payload?.data[key] || nuxtApp?.static?.data[key];
    },
    ...options,
  });
  // console.log('useappasynce')
  // error-handling
  if (options?.server === true) {
    if (unref(error)?.["statusCode"] || unref(error)?.["statusMessage"]) {
      showError({
        statusMessage: unref(error)?.["statusMessage"],
        statusCode: unref(error)?.["statusCode"],
      });
    }
  }
  return {
    data: data as Ref<DataT>,
    error: error as Ref<Ref<DataE | null> | null>,
    execute: execute as (
      opts?: AsyncDataExecuteOptions | undefined
    ) => Promise<DataT>,
    pending,
    refresh: refresh as (
      opts?: AsyncDataExecuteOptions | undefined
    ) => Promise<DataT>,
    status,
  };
};
