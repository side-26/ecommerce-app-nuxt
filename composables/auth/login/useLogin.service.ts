import { CLIENT_ID, CLIENT_SECRET } from "~/configs/api.config";
import { AuthResponse } from "~/types/auth";
import { LoginValues } from "~/types/auth/login";
import type { FetchCustomConfig } from "~/types/fetch";

export const useLoginService = () => {
  const fetchApi = useFetchData<any, AuthResponse>();
  const loginService = (
    { password, username }: LoginValues,
    customConfig: FetchCustomConfig
  ) => {
    return fetchApi(
      "/oauth2/rest/token",
      {
        method: "POST",
        body: {
          password,
          username,
          grant_type: "password",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      },
      customConfig
    );
  };
  return { loginService };
};
