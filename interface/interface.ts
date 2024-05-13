export interface NavLinkProps {
  id: number;
  href: string;
  title: string;
}

//
export interface CourseData {
  id: string;
  title: string;
  description: string;
}

// sessions
export interface Session {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  id: string; // Assuming there is an id field which is not visible in the image
  sessionId: string; // FK to Session
  title: string;
  url: {
    type: string;
    name: string;
    size: number;
    lastModified?: number;
    lastModifiedDate?: Date;
  }; //(image/video/pdf)
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaDisplayProps {
  url: string;
}
