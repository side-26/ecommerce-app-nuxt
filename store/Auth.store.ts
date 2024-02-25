import { TOKEN_KEY } from "~/configs/constants";
import type { AuthState, Identity, Token } from "~/types/auth";
import { defineStore } from "pinia";
import { useRefreshTokenService } from "~/composables/auth/useRefreshToken.service";
const initalAuthState = (): AuthState => ({
  accessToken: null,
  expiresIn: null,
  identity: {} as Identity,
  isRefreshing: false,
  isRefreshSuccess: false,
  refreshToken: null,
});

export const useAuthStore = defineStore("auth", {
  // other options...
  state: initalAuthState,
  getters: {
    getToken: (state): string | null => state.accessToken,
    isLoggedIn: (state): boolean => !!state.accessToken,
    getRefreshToken: (state): string | null => state.refreshToken,
    getFullName(state): string {
      return state.identity.first_name
        ? `${state.identity.first_name} ${state.identity.last_name}`
        : (state.identity.username as string);
    },
  },
  actions: {
    setToken(tokenObj: Token, setToLocal: boolean = true) {
      this.accessToken = tokenObj.accessToken;
      this.refreshToken = tokenObj.refreshToken;
      this.expiresIn = tokenObj.expiresIn;
      if (setToLocal) localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenObj));
    },
    setIdentity(identityObj: Identity) {
      this.identity = identityObj;
    },
    toggleRefreshingState(value: boolean) {
      this.isRefreshing = value;
    },
    toggleSuccessRefreshingState(value: boolean) {
      this.isRefreshSuccess = value;
    },
    clearStore(clearLocal: boolean = true) {
      Object.assign(this, initalAuthState());
      if (clearLocal) localStorage.removeItem(TOKEN_KEY);
    },
    doRefreshToken() {
      // console.log("fuck do refreshTRoken");
      this.isRefreshing = true;
      const { doRefreshTokenService } = useRefreshTokenService();
      doRefreshTokenService(this.getRefreshToken as string)
        .then((res) => {
          if (res !== undefined) {
            console.log(res);
            this.setToken(res.tokens, true);
            this.isRefreshSuccess = true;
            return res;
          }
        })
        .finally(() => (this.isRefreshing = false));
    },
    initialStoreFromLocal() {
      let tokenObj: Token = {} as Token;
      const localToken: string | "" | null = localStorage.getItem(TOKEN_KEY)!;
      if (localToken) tokenObj = JSON.parse(localToken!);
      this.setToken(tokenObj, false);
    },
  },
});
