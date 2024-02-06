import type { FormActions } from "vee-validate";
import { useCommentsService } from "./useComments.service";
import type { CommentBody } from "~/types/comments";
import { useAuthStore } from "~/store/Auth.store";
import {
  commentFullSchema,
  commentSchemaWithoutFullName,
} from "~/configs/form.validation";

export const useGetComments = async (courseId: number | undefined) => {
  const { getCommentsService } = useCommentsService();

  const { data, pending } = await useAppAsyncData(
    "comments-" + courseId,
    () => getCommentsService(courseId as number),
    {
      server: false,
    }
  );
  return { data, pending };
};
export const useCreateComment = (courseId: Ref<number>) => {
  const sumbitting = ref<boolean>(false);
  const { createCommentService } = useCommentsService();
  const authStore = useAuthStore();
  const hasFullName = computed(
    () => !!authStore.getFullName && authStore.isLoggedIn
  );
  const commentSchema = computed(() =>
    unref(hasFullName) ? commentSchemaWithoutFullName : commentFullSchema
  );
  const createComment = (
    body: CommentBody,
    action: FormActions<CommentBody>
  ) => {
    sumbitting.value = true;
    createCommentService(body, action)
      .then((res) => {
        if (res) action.resetForm();
      })
      .finally(() => (sumbitting.value = false));
  };
  const onSubmit = (values: CommentBody, actions) => {
    if (unref(hasFullName)) {
      values.first_name = authStore.identity?.first_name!;
      values.last_name = authStore.identity?.last_name!;
    }
    values.course_id = unref(courseId)!;
    createComment(values, actions);
    console.log(values);
  };
  return {
    createComment,
    onSubmit,
    sumbitting,
    hasFullName,
    commentSchema,
  };
};
