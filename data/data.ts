import { NavLinkProps } from "../interface/interface";
import { CourseData } from "../interface/interface";

export const links: NavLinkProps[] = [
    { id: 1, title: "Homepage", href: "/" },
    { id: 2, title: "Courses", href: "/courses" },
];

// dummy course data
export const courses:CourseData[] = [
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