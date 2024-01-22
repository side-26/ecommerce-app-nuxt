import { AsyncData, AsyncDataOptions } from "nuxt/app";
import { NuxtApp } from "nuxt/schema";

export const useAppAsyncData = async <DataT, DataE>(
  key: string,
  handler: (ctx?: NuxtApp | undefined) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
  initialCache: boolean = true
): Promise<AsyncData<DataT, DataE>> => {
  const { data, error, execute, pending, refresh, status } = useAsyncData<
    DataT,
    DataE
    // @ts-ignore
  >(key, handler, { immediate: process.server, ...options });
  // initial-cache
  
  // error-handling
  // if (options?.server === true) {
  //   if (unref(error)?.["statusCode"] || unref(error)?.["statusMessage"]) {
  //     showError({
  //       statusMessage: unref(error)?.["statusMessage"],
  //       statusCode: unref(error)?.["statusCode"],
  //     });
  //   }
  // }
  return {
    data: data as Ref<DataT>,
    error,
    execute,
    pending,
    refresh,
    status,
  };
};
