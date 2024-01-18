import { AsyncData, AsyncDataOptions } from "nuxt/app";
import { NuxtApp } from "nuxt/schema";

export const useAppAsyncData = async <DataT, DataE>(
  key: string,
  handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
  options?: AsyncDataOptions<DataT>
): Promise<AsyncData<DataT, DataE>> => {
  const { data, error, execute, pending, refresh, status } = await useAsyncData<
    DataT,
    DataE
  >(key, handler, options);
  if (unref(error)?.["statusCode"] || unref(error)?.["statusMessage"]) {
    showError({
      statusMessage: unref(error)?.["statusMessage"],
      statusCode: unref(error)?.["statusCode"],
    });
  }
  return {
    data,
    error,
    execute,
    pending,
    refresh,
    status,
  };
};
