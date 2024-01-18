import { object, string } from "yup";
import "./yup.config";
export const loginSchema = object({
  username: string().required().label("نام کاربری"),
  password: string().required().label("پسورد"),
});
export const commentSchema = object({
  first_name: string().required().label("اسم"),
  last_name: string().required().label("نام خانوادگی"),
  comment: string().required().label("نظر"),
});
// TODO add other commentSchema