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
  // const timeout = ref();
  const deleteToast = (deleteId: number) => {
    toastsList.value = unref(toastsList).filter(({ id }) => id !== deleteId);
  };
  const addNewToast = (
    msg: string,
    variant: ToastVariant = "success",
    timeout?: number
  ) => {
    const toastId = new Date().getTime();
    toastsList.value = [
      ...unref(toastsList),
      {
        id: toastId,
        toastMsg: msg,
        toastVariant: variant,
      },
    ];
    setTimeout(() => {
      deleteToast(toastId);
    }, timeout ?? 3000);
  };
  return {
    toastsList,
    addNewToast,
    deleteToast,
  };
};
