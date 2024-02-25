export interface CourseDetails {
    id: number;
    title: string;
    slug: string;
    description: string;
    short_description: string;
    meta_description: string;
    requirements: string;
    amount: number;
    amountOff: number;
    courseDuration: CourseDuration;
    computedEstimateDuration: CourseDuration;
    userCounter: string;
    courseChapters: CourseChapter[];
    courseQuestions: CourseQuestion[];
    src: string;
    statusText: string;
  }
  
  export interface CourseQuestion {
    id: number;
    question: string;
    answer: string;
  }
  
  export interface CourseChapter {
    id: number;
    chapterName: string;
    courseVideos: CourseVideo[];
  }
  export interface CourseChaperWithCounter extends CourseChapter{
    counter:number
  }
  export interface CourseVideo {
    id: number;
    course_id: number;
    videoTitle: string;
    videoDescription?: any;
    isDemo: number;
    hasFile: boolean;
    duration: number | string | string;
  }
  
  export interface CourseDuration {
    hours: number;
    minutes: number;
    seconds: number;
  }