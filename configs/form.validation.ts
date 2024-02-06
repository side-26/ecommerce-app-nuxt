import { object, string } from "yup";
import "./yup.config";
export const loginSchema = object({
  username: string().required().label("نام کاربری"),
  password: string().required().label("پسورد"),
});
export const commentFullSchema = object({
  first_name: string().required().label("اسم"),
  last_name: string().required().label("نام خانوادگی"),
  comment: string().required().label("نظر"),
});
export const commentSchemaWithoutFullName = object({
  comment: string().required().label("نظر"),
});