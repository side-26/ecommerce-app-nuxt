import { FetchCustomConfig } from "~/types/fetch";
import { useFetchData } from "./useFetchData";
import { Identity } from "~/types/auth";
export const useIdentityService = () => {
  const fetchApi = useFetchData<any, Identity>();
  const identityService = (
    customConfig: FetchCustomConfig = { setToken: true, goToLogin: false }
  ) => {
    return fetchApi(
      "/site/identity",
      {
        method: "GET",
      },
      customConfig
    );
  };
  return identityService;
};
