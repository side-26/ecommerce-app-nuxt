import { defineStore } from "pinia";
import type { CourseCartData } from "~/types/cart";
import { useCartService } from "~/composables/cart/useCart.service";
import { useAuthStore } from "./Auth.store";
const initalCartState = (): {
  data: CourseCartData[];
  fetching: boolean;
  fetchedOnce: boolean;
} => ({
  data: [],
  fetching: false,
  fetchedOnce: false,
});

export const useCartStore = defineStore("cart-store", {
  state: initalCartState,
  getters: {
    getStoreCartIds(state) {
      return state.data.map((item) => item?.id);
    },
    getCartLength(state) {
      return state.data?.length || 0;
    },
  },
  actions: {
    getCartLocalIds(): number[] {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    },
    getCartItemsList(): Promise<any> {
      const authStore = useAuthStore();
      const { getCartWhenLoggedInService, getCartWhenLoggedOutService } =
        useCartService();
      this.fetching = true;
      if (authStore.isLoggedIn) {
        return getCartWhenLoggedInService()
          .then((res) => {
            this.data = res;
          })
          .finally(() => {
            this.fetching = false;
            this.fetchedOnce = true;
          });
      } else {
        const ids = this.getCartLocalIds();
        if (ids?.length > 0) {
          return getCartWhenLoggedOutService(ids)
            .then((res) => (this.data = res))
            .finally(() => {
              this.fetching = false;
              this.fetchedOnce = true;
            });
        } else {
          this.fetching = false;
          this.fetchedOnce = true;
          return Promise.resolve("");
        }
      }
    },
    isIdExisted(id: number): boolean {
      return this.data?.some(({ id: storedId }) => id === storedId);
    },
    addToCart(courseId: number): Promise<any> {
      const authStore = useAuthStore();
      const { addToCartService } = useCartService();
      const { addNewToast } = useToast();
      if (authStore.isLoggedIn) {
        return addToCartService(courseId).then((res) => {
          if (res) {
            console.log(res);
            this.data = res;
            addNewToast("با موفقیت به لیست خرید اضافه شد");
          }
        });
      } else {
        const ids = this.getCartLocalIds();
        if (this.isIdExisted(courseId)) {
          addNewToast("این دوره در لیست خرید شما موجود است!!", "warning");
          return Promise.reject("");
        }
        ids.push(courseId);
        localStorage.setItem("cart", JSON.stringify(ids));
        addNewToast("با موفقیت به لیست خرید اضافه شد");
        return this.getCartItemsList();
      }
    },
    async deleteFromCart(deletedId: number): Promise<any> {
      const authStore = useAuthStore();
      const { deleteFromCartService } = useCartService();
      if (authStore.isLoggedIn) {
        await deleteFromCartService(deletedId);
      }
      this.data = this.data.filter(({ id }) => id != deletedId);
      return Promise.resolve("");
    },
    synceIdToLocal() {
      localStorage.setItem(
        "cart",
        JSON.stringify(this.data.map((item) => item.id))
      );
    },
  },
});
