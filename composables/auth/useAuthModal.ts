import { useAuthStore } from "~/store/Auth.store";

export const useAuthModal = () => {
  const route = useRoute();
  const isModalOpen = useState<boolean>("--auth-modal--", () => false);
  const router = useRouter();
  const openModal = () => {
    isModalOpen.value = true;
  };
  const closeModal = () => {
    if (route.fullPath === "/?need_auth=true")
      router.replace({ path: "/", query: {} });
    isModalOpen.value = false;
  };
  return { isModalOpen, openModal, closeModal };
};
