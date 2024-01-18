export const appToastKey = "--app_toast--";
export const CURRENCY = "تومان";
export const TOKEN_KEY = "token";
export const ROUTES = {
  home: "/",
  courses: "/courses",
  articals: "/articals",
  aboutUs: "/about_us",
  profile: "/profile",
};
export const appNavbar: {
  id: number;
  title: string;
  to: string;
}[] = [
  {
    id: 1,
    title: "صفحه اصلی",
    to: ROUTES.home,
  },
  {
    id: 3,
    title: "دوره آموزشی",
    to: ROUTES.courses,
  },
  {
    id: 5,
    title: "مقالات",
    to: ROUTES.articals,
  },
  {
    id: 7,
    title: "درباره ما",
    to: ROUTES.aboutUs,
  },
];
export const courseDetailsNavbar = [
  {
    id: 1,
    title: "درباره دوره",
    to: "#about_course",
    elementId: "about_course",
  },
  {
    id: 2,
    title: "پیش نیازهای دوره",
    to: "#prerequisite_courses",
    elementId: "prerequisite_courses",
  },
  {
    id: 3,
    title: "لیست ویدیو ها",
    to: "#courses_list",
    elementId: "courses_list",
  },
  {
    id: 4,
    title: "پرسش های متداول",
    to: "#FAQ",
    elementId: "FAQ",
  },
  {
    id: 5,
    title: "نظرات کاربران",
    to: "#comments",
    elementId: "comments",
  },
];
