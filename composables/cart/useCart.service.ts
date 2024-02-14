import type { CartDataWhenLoggedIn, CourseCartData } from "~/types/cart";
import { addSignToKey } from "~/utils/helpers/queryStringify";
const beforeResponse = (response) => {
  if (response) {
    return response.map((item) => item.course);
  }
};
export const useCartService = () => {
  const addToCartService = (courseId: number) => {
    const customFetch = useFetchData<
      { course_id: number }[],
      { course_id: number }[]
    >();
    return customFetch(
      "/cart/add",
      {
        method: "POST",
        body: {
          course_id: courseId,
        },
        params: {
          expand:
            "course.src,course.statusText,course.isRecording,course.percent",
        },
      },
      {
        setToken: true,
        toastValidationFields: ["course_id"],
        beforeResponse,
      }
    );
  };
  const getCartWhenLoggedOutService = (ids: number[]) => {
    const customFetch = useFetchData<any, CartDataWhenLoggedIn>();
    return customFetch(
      `/cart/course-by-id${addSignToKey("id", ids)}`,
      { params: { expand: "src,statusText,isRecording,percent" } },
      { setToken: true }
    );
  };
  const getCartWhenLoggedInService = () => {
    const customFetch = useFetchData<any, CourseCartData>();

    return customFetch(
      "/cart/index",
      {
        params: {
          expand:
            "course.src,course.statusText,course.isRecording,course.percent",
        },
      },
      { setToken: true, beforeResponse }
    );
  };
  const deleteFromCartService = (deletedId: number) => {
    const fetchData = useFetchData<any, boolean>();
    return fetchData(
      "/cart/delete",
      { params: { course_id: deletedId }, method: "delete" },
      {
        setToken: true,
        // ignoreErrors: true,
      }
    );
  };
  return {
    addToCartService,
    deleteFromCartService,
    getCartWhenLoggedInService,
    getCartWhenLoggedOutService,
  };
};
