"use client";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export default function Redirect({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className={cn("hover:cursor-pointer", className)}
      onClick={() => router.push(url)}
    >
      {children}
    </Button>
  );
}
