import { NavLinkProps } from "../interface/interface";
import { CourseData, Session, Content } from "../interface/interface";

export const links: NavLinkProps[] = [
    { id: 1, title: "Homepage", href: "/" },
    { id: 2, title: "Courses", href: "/courses" },
];

// Dummy data for CourseData
export const dummyCourses: CourseData[] = [
  {
      id: "1",
      title: "React",
      description: "Learn React",
  },
  {
      id: "2",
      title: "Node",
      description: "Learn Node",
  },
  {
      id: "3",
      title: "Express",
      description: "Learn Express",
  },
];

// Dummy sessions data
export const sessions: Session[] = [
  {
    id: "1",
    courseId: "1",
    title: "Introduction to React",
    description: "Learn the basics of React framework",
    duration: "1 hour",
    createdAt: "2024-04-30T08:00:00Z",
    updatedAt: "2024-04-30T08:00:00Z",
  },
  {
    id: "2",
    courseId: "1",
    title: "State Management in React",
    description: "Understanding state management in React",
    duration: "1.5 hours",
    createdAt: "2024-05-01T08:00:00Z",
    updatedAt: "2024-05-01T08:00:00Z",
  },
  {
    id: "3",
    courseId: "2",
    title: "Introduction to Node.js",
    description: "Learn the basics of Node.js runtime environment",
    duration: "1 hour",
    createdAt: "2024-05-02T08:00:00Z",
    updatedAt: "2024-05-02T08:00:00Z",
  },
  {
    id: "3",
    courseId: "3",
    title: "Introduction to express.js",
    description: "Learn the basics of Node.js runtime environment",
    duration: "1 hour",
    createdAt: "2024-05-02T08:00:00Z",
    updatedAt: "2024-05-02T08:00:00Z",
  },
];

// Dummy content data
export const contentData: Content[] = [
  {
    id: "1",
    sessionId: "1",
    title: "React Logo",
    url: "https://fastly.picsum.photos/id/488/200/300.jpg?hmac=0juhK9GVPUpSjHaRjdjZO5Fw2bcfSYHNjXLYTg3ZsQU",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    sessionId: "1",
    title: "React Intro Video",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    sessionId: "2",
    title: "State Management Diagram",
    url: "https://www.soundczech.cz/temp/lorem-ipsum.pdf",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    sessionId: "3",
    title: "express",
    url: "https://picsum.photos/200/300",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
