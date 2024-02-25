export interface CourseComment {
  id: number;
  comment: string;
  first_name: string;
  last_name: string;
  satisfaction: number;
  status: number;
  created_at: number;
  children: CommentAnswer[];
  createdDate: string;
}

export interface CommentAnswer {
  id: number;
  comment: string;
  first_name: string;
  last_name: string;
  satisfaction: number;
  status: number;
  created_at: number;
}
export interface CommentBody {
  first_name: string;
  last_name: string;
  comment: string;
  course_id: number;
}
