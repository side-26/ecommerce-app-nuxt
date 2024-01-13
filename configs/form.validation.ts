import { object, string } from "yup";
import "./yup.config";
export const loginSchema = object({
  username: string().required().label("نام کاربری"),
  password: string().required().label("پسورد"),
});
