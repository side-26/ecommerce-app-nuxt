import { useAuthStore } from "~/store/Auth.store";

export const useIdentity = () => {
  const getIdentityService = useIdentityService();
  const authStore = useAuthStore();
  const loading = ref<boolean>(false);
  const getIdentity = () => {
    if(authStore.isLoggedIn){
        loading.value = true;
        getIdentityService()
          .then((res) => {
            if (res !== undefined) {
              authStore.setIdentity(res);
            }
          })
          .finally(() => (loading.value = false));
      };
    }
  return {
    getIdentity,
    loading,
  };
};
