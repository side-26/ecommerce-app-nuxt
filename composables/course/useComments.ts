import { FormActions } from "vee-validate";
import { CourseDetails } from "~/types/course";
import { useCommentsService } from "./useComments.service";
import { CommentBody } from "~/types/comments";
import { FetchCustomConfig } from "~/types/fetch";

export const useGetComments = async (courseDetail: Ref<CourseDetails>) => {
  const { getCommentsService } = useCommentsService();

  const { data, pending } = await useAppAsyncData(
    "comments" + "courseId",
    () => getCommentsService(courseDetail?.value.id as number),
    {
      server: true,
      watch: [courseDetail],
    }
  );
  return { data, pending };
};
export const useCreateComment = () => {
  const sumbitting = ref<boolean>(false);
  const { createCommentService } = useCommentsService();
  const createComment = (body: CommentBody, action: FormActions) => {
    sumbitting.value = true;
    createCommentService(body, action)
      .then((res) => {
        if (res) action.resetForm();
      })
      .finally(() => (sumbitting.value = false));
  };
  return {
    createComment,
    sumbitting,
  };
};
