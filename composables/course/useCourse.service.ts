import {
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from "class-transformer";
import { BaseCourseDto } from "./course.dto";

export const useCourseService = () => {
  const fetch = useFetchData();
  const getCourseList = () => {
    return fetch("/course/index?expand=src,percent,slug", {
      method: "get",
    }).then((res) => {
      return res;
    });
  };
  return { getCourseList };
};

export const useCheckCanBuyService = () => {
  const fetch = useFetchData<any, number>();
  const canBuyService = (id: number, onError) => {
    return fetch(
      "/course-videos/is-user-in-the-course",
      { params: { id } },
      { setToken: true }
    );
  };
  return {
    canBuyService,
  };
};
