import { useCourseDetailService } from "./useCourseDetails.service";

export const useCourseDetails = async (slug: string) => {
  const { courseDetailsService } = useCourseDetailService();
  console.log("hello");
  const { pending, data } = await useAppAsyncData(
    "course-details-" + slug,
    () => courseDetailsService(slug),
  );
  return {
    pending,
    data,
  };
};
