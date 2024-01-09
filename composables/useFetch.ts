import { BASE_URL } from "~/configs/api.config"


export const useFetchData = () => {
    const getFetchedData = <T>(url: string, config?: NitroFetchOptions) => {
        
        return $fetch<T>(url, { baseURL: BASE_URL, ...config })
    }
    return getFetchedData
}