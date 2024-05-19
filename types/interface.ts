import { AxiosError } from "axios";

export interface NavLinkProps {
  id: number;
  href: string;
  title: string;
}

//
export interface CourseData {
  id: string;
  name: string;
  description: string;
}

// sessions
export interface Session {
  id: string;
  courseId: string;
  name: string;
  description: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string; // Assuming there is an id field which is not visible in the image
  sessionId: string; // FK to Session
  // title: string;
  // url: {
  //   type: string;
  //   name: string;
  //   size: number;
  //   lastModified?: number;
  //   lastModifiedDate?: Date;
  // }; //(image/video/pdf)
  filename: File | undefined | string;
  name: string;
  type: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaDisplayProps {
  url: string;
  type: string;
}
export interface MediaDisplayComponentsProps {
  url: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  coursesId: string[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  password: string;
  coursesId: string[];
  invitedStudentsId: string[];
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  name?: string | null | undefined;
  role?: string;
  userName?: string;
  token?: string;
  user: UserState;
}

export interface UserState {
  createdAt: string;
  email: string;
  id: 4;
  name: string;
  password: string;
  role: "student" | "instructor";
  updatedAt: string;
}

export interface RequestOptions<T> {
  url: string;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
}
