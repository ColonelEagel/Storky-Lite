import { Instructor, NavLinkProps, Student } from "../types/interface";
import { CourseData, Session, Content } from "../types/interface";

export const links: NavLinkProps[] = [
    { id: 1, title: "Homepage", href: "/" },
    { id: 2, title: "Courses", href: "/courses" },
];

// Dummy data for CourseData
export const dummyCourses: CourseData[] = [
  {
      id: "1",
      name: "React",
      description: "Learn React",
  },
  {
      id: "2",
      name: "Node",
      description: "Learn Node",
  },
  {
      id: "3",
      name: "Express",
      description: "Learn Express",
  },
];

// Dummy sessions data
export const sessions: Session[] = [
  {
    id: "1",
    courseId: "1",
    name: "Introduction to React",
    description: "Learn the basics of React framework",
    duration: 1,
    createdAt: "2024-04-30T08:00:00Z",
    updatedAt: "2024-04-30T08:00:00Z",
  },
  {
    id: "2",
    courseId: "1",
    name: "State Management in React",
    description: "Understanding state management in React",
    duration: 1.5,
    createdAt: "2024-05-01T08:00:00Z",
    updatedAt: "2024-05-01T08:00:00Z",
  },
  {
    id: "3",
    courseId: "2",
    name: "Introduction to Node.js",
    description: "Learn the basics of Node.js runtime environment",
    duration: 1,
    createdAt: "2024-05-02T08:00:00Z",
    updatedAt: "2024-05-02T08:00:00Z",
  },
  {
    id: "3",
    courseId: "3",
    name: "Introduction to express.js",
    description: "Learn the basics of Node.js runtime environment",
    duration: 1,
    createdAt: "2024-05-02T08:00:00Z",
    updatedAt: "2024-05-02T08:00:00Z",
  },
];

// Dummy content data
export const contentData: Content[] = [
  {
    id: "1",
    sessionId: "1",
    // name: "React Logo",
    // url: {
    //   type: "image",
    //   name: "/409734957_908831464231117_6904991865240498873_n.jpg",
    //   size: 1000,},
    filename:"/409734957_908831464231117_6904991865240498873_n.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    sessionId: "1",
    // name: "React Intro Video",
    // url: {
    //   type: "video",
    //   name: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    //   size: 1000,
    // },
    filename:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    sessionId: "2",
    // name: "State Management Diagram",
    // url: {
    //   type: "application/pdf",
    //   name: "https://www.soundczech.cz/temp/lorem-ipsum.pdf",
    //   size: 1000,},
    filename:"https://www.soundczech.cz/temp/lorem-ipsum.pdf",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    sessionId: "3",
    // name: "express",
    // url: {
    //   type: "image",
    //   name: "/images.jpeg",
    //   size: 1000,
    // },
    filename:"/images.jpeg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const students:Student[]=[{
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  coursesId: ["1", "2", "3"],
  password: "XXXXXXXX",
  isAdmin: false,
  createdAt: new Date(),
  updatedAt: new Date(),
},]

export const instructors:Instructor[]=[{
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    coursesId: ["1", "2", "3"],
    invitedStudentsId: ["1", "2", "3"],
    password: "XXXXXXXX",
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
}]
