import { Pinia } from "pinia";
import { useAuthStore } from "~/store/Auth.store";

export default defineNuxtPlugin(({ pinia }) => {
  const authStore = useAuthStore(pinia as Pinia);
  authStore.initialStoreFromLocal();
});
