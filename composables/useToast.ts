import { appToastKey } from "~/configs/constants";

type ToastVariant = "success" | "info" | "warning" | "error";
export const useToast = () => {
  const toastsList = useState<
    {
      id: number;
      toastMsg: string;
      toastVariant: ToastVariant;
    }[]
  >(appToastKey, () => {
    return [];
  });
  const timeout = ref();
  const deleteToast = (deleteId: number) => {
    toastsList.value = unref(toastsList).filter(({ id }) => id !== deleteId);
  };
  const addNewToast = (msg: string, variant: ToastVariant = "success") => {
    toastsList.value = [
      ...unref(toastsList),
      {
        id: new Date().getTime(),
        toastMsg: msg,
        toastVariant: variant,
      },
    ];
  };
  // watch(toastsList, (val) => {
  //   if (val?.length === 0) clearTimeout(unref(timeout));
  // });
  // watchEffect(() => {
  //   const firstToastId = unref(toastsList)[0]?.id;
  //   timeout.value = setInterval(() => {
  //     deleteToast(firstToastId);
  //   }, 4000);
  // });
  return {
    toastsList,
    addNewToast,
    deleteToast,
  };
};
