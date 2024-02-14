import type { Pinia } from "pinia";
import { useCartStore } from "~/store/Cart.store";
export default defineNuxtPlugin(({ pinia }) => {
  const cartStore = useCartStore(pinia as Pinia);
  cartStore.$subscribe(() => {
    cartStore.synceIdToLocal();
  });
  // console.log("before getting");
  cartStore.getCartItemsList();
  // console.log("after getting");
});
