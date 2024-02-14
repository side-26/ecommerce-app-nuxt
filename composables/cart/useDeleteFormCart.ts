import { useCartStore } from "~/store/Cart.store";
export const useDeleteFromCart = (courseId: number) => {
  const deleting = useState<boolean>(`deleting-${courseId}`, () => false);
  const cartStore = useCartStore();
  const deleteFromCart = (deletedId: number) => {
    deleting.value = true;
    cartStore.deleteFromCart(deletedId).finally(() => (deleting.value = false));
  };
  return {
    deleting,
    deleteFromCart,
  };
};
