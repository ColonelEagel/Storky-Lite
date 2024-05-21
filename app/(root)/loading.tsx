import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="mb-8">
        <Skeleton className=" rounded-xl w-full h-14 " />
        <Separator />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
        <Skeleton className=" rounded-xl h-36 " />
      </div>
    </Container>
  );
};

export default Loading;
