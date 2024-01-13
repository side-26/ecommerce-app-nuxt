import { isAuthRoute } from "~/utils/helpers/auth.helper";
import { useAuthModal } from "./../composables/auth/useAuthModal";
import { useAuthStore } from "~/store/Auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const { closeModal, openModal } = useAuthModal();
  if (process.client) {
    if (!authStore.isLoggedIn && isAuthRoute(to.fullPath))
      return navigateTo("/?need_auth=true");
    if (to.fullPath === "/?need_auth=true" && !authStore.isLoggedIn)
      openModal();
  }
});
