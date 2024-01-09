import { instanceToPlain, plainToClass, plainToInstance } from "class-transformer"
// import { BaseCourseDto } from "./course.dto"

export const useCourseService = () => {
    const $fetch = useFetchData()
    const getCoursesList = () => {
        return $fetch('/course/index?expand=src,percent,slug').then((res) => {
            // const instance = plainToInstance(BaseCourseDto, res, { excludeExtraneousValues: true })
            return res
        })
    }
    return { getCoursesList }
}