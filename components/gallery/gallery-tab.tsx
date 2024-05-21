import NextImage from "next/image";
import { Tab, TabPanel } from "@headlessui/react";

import { cn } from "@/lib/utils";
import MediaDisplay from "./MediaDisplay";
import { MediaDisplayProps } from "@/types/interface";

const GalleryTab: React.FC<MediaDisplayProps> = ({ url, type }) => {
  return (
    <>
      {url && (
        <TabPanel className="">
          {({ selected }) => (
            <span
              className={cn(
                "absolute inset-0 rounded-md w-full h-full border-zinc-100 border-2",
                selected ? "ring-black" : "ring-transparent"
              )}
            >
              <MediaDisplay url={url} type={type} />
            </span>
          )}
        </TabPanel>
      )}
    </>
  );
};

export default GalleryTab;
