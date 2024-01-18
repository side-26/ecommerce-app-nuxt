import { CourseDetails } from "~/types/course";

export const useCourseDetailService = () => {
  const fetch = useFetchData<any, CourseDetails>();

  const courseDetailsService = (slug: string) => {
    console.log("hello service");
    return fetch("/course/view", {
      params: {
        slug,
        expand:
          "courseDuration,computedEstimateDuration,statusText,src,courseQuestions,courseChapters.courseVideos.duration,userCounter",
      },
    });
  };
  return {
    courseDetailsService,
  };
};
