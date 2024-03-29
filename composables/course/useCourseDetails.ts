import { useAppAsyncData } from "./../useAppAsyncData";
import { useAuthStore } from "~/store/Auth.store";
import { useCourseDetailService } from "./useCourseDetails.service";
import { useCheckCanBuyService } from "./useCourse.service";
import type { CourseDetails } from "~/types/course";
type CAN_BUY = { loading: boolean; canBuy: boolean };
export const useCourseDetails = async (slug: string) => {
  const { courseDetailsService } = useCourseDetailService();
  const { currentPosition } = useCourseNavbarIntersection();
  const { pending, data } = await useAppAsyncData(
    "course-details-" + slug,
    () => courseDetailsService(slug),
    {
      server: true,
      lazy: true,
    }
  );

  return {
    pending,
    data,
    currentPosition,
  };
};
export const useCanBuyProvider = (courseId: Ref<number | undefined>) => {
  const { canBuyService: fetchIsInTheCourse } = useCheckCanBuyService();
  const authStore = useAuthStore();
  const userCanBuy = reactive<CAN_BUY>({ loading: true, canBuy: false });
  onBeforeMount(() => {
    watch(
      [() => authStore.isLoggedIn, courseId],
      () => {
        if (unref(courseId) && authStore.isLoggedIn) {
          userCanBuy.loading = true;
          fetchIsInTheCourse(unref(courseId)!, {})
            .then((isIn) => {
              if (isIn != undefined) {
                userCanBuy.canBuy = !!!isIn;
              }
            })
            .finally(() => {
              userCanBuy.loading = false;
            });
        } else {
          userCanBuy.canBuy = false;
        }
      },
      { immediate: true }
    );
  });
  provide<CAN_BUY>("--canBuy--", userCanBuy);
};
export const useCanBuyConsumer = () => {
  const userCanBuy = inject("--canBuy--", { loading: true, canBuy: false });
  return toRefs(userCanBuy);
};
const useCourseNavbarIntersection = () => {
  const currentPosition = ref<string>("");
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentPosition.value = entry.target.getAttribute("id") as string;
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".course-details-box").forEach((section) => {
      console.log(section);
      observer.observe(section);
    });
  });
  return {
    currentPosition,
  };
};
export const useTransformData = (courseDetails: Ref<CourseDetails>) => {
  const videoCount = computed(() => {
    let count = 0;
    if (courseDetails.value) {
      courseDetails?.value?.courseChapters.map((videos) => {
        count += videos.courseVideos?.length;
        courseDetails?.value?.courseChapters;
      });
      return count;
    }
    return "درحال محاسبه...";
  });
  const totalCourseTime = computed(() => {
    if (courseDetails?.value) {
      const { hours, minutes, seconds } = courseDetails?.value?.courseDuration;
      return hours > 0 || minutes > 0 || seconds > 0
        ? `${hours} : ${minutes} : ${seconds}`
        : "در حال ضبط";
    }
    return "درحال محاسبه...";
  });
  return {
    videoCount,
    totalCourseTime,
  };
};
export const useProvideModalState = () => {
  const isFreeCourseModalOpen = ref<boolean>();
  const toggleFreeCourseModal = () => {
    isFreeCourseModalOpen.value = !unref(isFreeCourseModalOpen);
  };
  provide("--open-free-modal--", {
    isModalOpen: isFreeCourseModalOpen,
    toggleFreeCourseModal,
  });
  return {
    isFreeCourseModalOpen,
    toggleFreeCourseModal,
  };
};
