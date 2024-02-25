// this is types folder

import { NuxtApp } from "nuxt/schema"
import { WatchSource } from "vue"

type ToastProps='success'|'error'|'warning'|'info'

function useAsyncData<DataT, DataE>(
    handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
    options?: AsyncDataOptions<DataT>
  ): AsyncData<DataT, DataE>
  function useAsyncData<DataT, DataE>(
    key: string,
    handler: (nuxtApp?: NuxtApp) => Promise<DataT>,
    options?: AsyncDataOptions<DataT>
  ): Promise<AsyncData<DataT, DataE>
  
  type AsyncDataOptions<DataT> = {
    server?: boolean
    lazy?: boolean
    immediate?: boolean
    deep?: boolean
    dedupe?: 'cancel' | 'defer'
    default?: () => DataT | Ref<DataT> | null
    transform?: (input: DataT) => DataT
    pick?: string[]
    watch?: WatchSource[]
    getCachedData?: (key: string) => DataT
  }
  
  export type AsyncData<DataT, ErrorT> = {
    data: Ref<DataT | null>
    pending: Ref<boolean>
    refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
    execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
    error: Ref<ErrorT | null>
    status: Ref<AsyncDataRequestStatus>
  };
  
  interface AsyncDataExecuteOptions {
    dedupe?: 'cancel' | 'defer'
  }
  
  type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'
  
