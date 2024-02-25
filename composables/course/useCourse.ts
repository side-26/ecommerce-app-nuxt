import { useCourseService } from "./useCourse.service";

export const useCourse = async () => {
  const { getCourseList } = useCourseService();
  const { data, pending } = await useAppAsyncData(
    "course-list",
    () => getCourseList(),
    { server: false }
  );
  return {
    data,
    pending,
  };
};
