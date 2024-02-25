import { useCartStore } from "~/store/Cart.store";

export const useAddToCart = (courseId: number) => {
  const cartStore = useCartStore();
  const adding = useState<boolean>(`adding-${courseId}`, () => false);

  const addToCart = (courseId: number) => {
    adding.value = true;
    cartStore.addToCart(courseId).finally(() => (adding.value = false));
  };
  return { adding, addToCart };
};
