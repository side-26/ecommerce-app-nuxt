import { CLIENT_ID, CLIENT_SECRET } from "~/configs/api.config";
import { useAuthStore } from "~/store/Auth.store";

export const useRefreshTokenService = () => {
  const sendRefreshToken = useFetchData<
    any,
    {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }
  >();

  const doRefreshTokenService = (
    refreshToken: string
  ): Promise<{
    token: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }> => {
    return sendRefreshToken(
      "/oauth2/rest/token",
      {
        method: "post",
        body: {
          refresh_token: refreshToken,
          grant_type: "refresh_token",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
      },
      {
        ignoreErrors: true,
      }
    ).then((res) => {
      if (res !== undefined) {
        const { access_token, refresh_token, expires_in } = res;
        return {
          tokens: {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: new Date().getTime() + expires_in * 1000,
          },
        };
      }
      return res;
    });
  };
  return { doRefreshTokenService };
};
