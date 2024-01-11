export const useAuthModal = () => {
  const isModalOpen = useState<boolean>("--auth-modal--", () => false);
  const openModal = () => {
    isModalOpen.value = true;
  };
  const closeModal=()=>{
    isModalOpen.value=false
  }
  return { isModalOpen,openModal,closeModal };
};
