export interface CartDataWhenLoggedIn {
  course_id: number;
  course: CourseCartData;
}

export interface CourseCartData {
  id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  meta_description: string;
  requirements: string;
  amount: number;
  amountOff: number;
  src: string;
  statusText: string;
  isRecording: boolean;
  percent: number;
}
export interface LocalCartItems {
  id: number;
}
