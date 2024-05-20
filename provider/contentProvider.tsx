import { useEffect, useState } from "react";
import { Content, Session } from "@/types/interface";
import { useSession } from "next-auth/react";
import useGetContent from "@/actions/useGetContent";
import GalleryTab from "@/components/gallery/gallery-tab";

interface GetContentProps {
  courseId: string;
  sessionId: string;
}
export default function ContentProvider({
  courseId,
  sessionId,
}: GetContentProps) {
  const { content } = useGetContent({ courseId, sessionId });

  return (
    <>
      {content &&
        content.map((item) => (
          <GalleryTab key={item.id} url={item.url} type={item.type} />
        ))}
    </>
  );
}
