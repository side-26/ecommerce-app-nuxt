export const useToast = (toastKey: string) => {
    const toastInfo = useState<
        {
            showToast: boolean,
            toastMsg: string,
            toastVariant: ToastProps
        }
    >(toastKey, () => {
        return {
            showToast: false,
            toastMsg: '',
            toastVariant: 'success'
        }
    })
    const timeout = ref()
    const closeByClick = () => {
        closeToast(0)
    }
    const closeToast = (timeOut: number) => {
        timeout.value = setTimeout(() => {
            toastInfo.value.showToast = false;
            toastInfo.value.toastMsg = ''
        }, timeOut);
    }
    const showToast = (msg: string, variant: ToastProps = 'success') => {
        toastInfo.value.showToast = true;
        toastInfo.value.toastMsg = msg
        toastInfo.value.toastVariant = variant
    }
    watchEffect(() => {
        if (toastInfo.value.showToast)
            closeToast(3000)
    })
    onBeforeUnmount(() => {
        // console.log('timeout cleared!!');
        clearTimeout(unref(timeout));

    })
    return {
        showToast, toastInfo: unref(toastInfo), closeByClick
    }
}