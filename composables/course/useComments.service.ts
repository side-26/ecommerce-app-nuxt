import { CourseComment, CommentBody } from "~/types/comments";
import { FetchCustomConfig } from "~/types/fetch";

export const useCommentsService = () => {
  const fetch = useFetchData<any, CourseComment[]>();
  const getCommentsService = (courseId: number) => {
    return fetch("/course-comments/by-course", {
      params: { course_id: courseId, expand: "children,createdDate" },
    });
  };
  const createCommentService = (
    body: CommentBody,
    customConfig: FetchCustomConfig
  ) => {
    return fetch(
      "/course-comments/create",
      { method: "post", body },
      { setToken: true, ...customConfig }
    ).then((response) => {
      return response;
    });
  };
  return { getCommentsService, createCommentService };
};
