import { isAuthRoute } from "~/utils/helpers/auth.helper";
import { useAuthStore } from "~/store/Auth.store";

export const useLogout = () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const router = useRouter();
  const logout = async () => {
    authStore.clearStore();
    if (isAuthRoute(route.path)) {
      router.replace("/");
    }
  };
  return { logout };
};
