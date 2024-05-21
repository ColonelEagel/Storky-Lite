import { AxiosError } from "axios";

/**
 * Interface defining the props for a NavLink component.
 */
export interface NavLinkProps {
  /** The unique identifier for the nav link. */
  id: number;
  /** The URL the nav link points to. */
  href: string;
  /** The title of the nav link. */
  title: string;
}

// Course data

/**
 * Interface defining the data for a course.
 */
export interface CourseData {
  /** The unique identifier for the course. */
  id: string;
  /** The name of the course. */
  name: string;
  /** The description of the course. */
  description: string;
}

// Sessions

/**
 * Interface defining the data for a session.
 */
export interface Session {
  /** The unique identifier for the session. */
  id: string;
  /** The unique identifier for the course the session belongs to. */
  courseId: string;
  /** The name of the session. */
  name: string;
  /** The description of the session. */
  description: string;
  /** The duration of the session in hours. */
  duration: number ;
  /** The timestamp when the session was created. */
  createdAt: string;
  /** The timestamp when the session was last updated. */
  updatedAt: string;
}

/**
 * Interface defining the data for a piece of content in a session.
 */
export interface Content {
  /** The unique identifier for the content. */
  id: string;
  /** The unique identifier for the session the content belongs to. */
  sessionId: string;
  /** The name of the content. */
  name: string;
  filename : File 
  /** The type of the content (e.g. "image", "video", "pdf"). */
  type: string;
  /** The URL of the content. */
  url: string;
  /** The timestamp when the content was created. */
  createdAt: Date;
  /** The timestamp when the content was last updated. */
  updatedAt: Date;
}

/**
 * Interface defining the props for a MediaDisplay component.
 */
export interface MediaDisplayProps {
  /** The URL of the media. */
  url: string;
  /** The type of the media (e.g. "image", "video", "pdf"). */
  type: string;
}

/**
 * Interface defining the props for a MediaDisplayComponents component.
 */
export interface MediaDisplayComponentsProps {
  /** The URL of the media. */
  url: string;
}

// User

/**
 * Interface defining the data for a user.
 */
export interface User {
  /** The name of the user. */
  name?: string | null | undefined;
  /** The role of the user. */
  role?: string;
  /** The username of the user. */
  userName?: string;
  /** The authentication token for the user. */
  token?: string;
  /** The user state. */
  user?: UserState;
}

/**
 * Interface defining the state of a user.
 */
export interface UserState {
  /** The timestamp when the user was created. */
  createdAt: string;
  /** The email address of the user. */
  email: string;
  /** The unique identifier for the user. */
  id: number;
  /** The name of the user. */
  name: string;
  /** The password of the user. */
  password: string;
  /** The role of the user. */
  role: "student" | "instructor";
  /** The timestamp when the user was last updated. */
  updatedAt: string;
}

/**
 * Interface defining the options for a request.
 * @template T The type of the data returned by the request.
 */
export interface RequestOptions<T> {
  /** The URL of the request. */
  url: string;
  /** The callback function to be called when the request is successful. */
  onSuccess?: (data: T) => void;
  /** The callback function to be called when the request fails. */
  onError?: (error: AxiosError) => void;
}

/**
 * Interface defining the props for the CellAction component.
 */
export interface CellActionProps {
  /** The unique identifier for the cell action. */
  id: string;
  /** The class name for the cell action. */
  className?: string;
  /** The type of the cell action. */
  type: string;
  /** The children of the cell action. */
  children?: React.ReactNode;
  /** The callback function to be called when the cell action is updated. */
  onUpdate?: () => void;
  /** The callback function to be called when the cell action is deleted. */
  onDelete: () => void;
  /** Indicates if the cell action is loading. */
  loading: boolean;
}

/**
 * Interface defining the props for the renderLessonContent component.
 */
export interface RenderLessonContentProps {
  /** The ID of the session. */
  sessionId: string;
  /** The ID of the course. */
  courseId: string;
  /** The class name for the component. */
  className?: string;
}

/**
 * Interface defining the props for the AlertModal component.
 */
export interface AlertModalProps {
  /** Indicates if the modal is open. */
  isOpen: boolean;
  /** The callback function to be called when the modal is closed. */
  onClose: () => void;
  /** The callback function to be called when the modal is confirmed. */
  onConfirm: () => void;
  /** Indicates if the modal is loading. */
  loading: boolean;
}
