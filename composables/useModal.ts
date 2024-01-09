export const useModal = () => {
    const isMoalOpen = useState<boolean>(() => false)
    const openModal = () => {
        isMoalOpen.value = true
    }
    const closeModal = () => {
        isMoalOpen.value = false
    }
    return { isMoalOpen:unref(isMoalOpen), openModal, closeModal }
}