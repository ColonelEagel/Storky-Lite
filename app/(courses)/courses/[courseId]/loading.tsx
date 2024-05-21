import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Skeleton from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="h-[calc(100vh-12rem)]">
        <div className="mb-8">
          <Skeleton className=" rounded-xl w-full h-14 " />
          <Separator />
        </div>
        <div className="flex flex-col gap-4 h-full">
          <Skeleton className=" rounded-xl h-1/2 " />
          <Skeleton className=" rounded-xl h-1/2 " />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
