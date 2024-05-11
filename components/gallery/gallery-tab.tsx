import NextImage from "next/image";
import { Tab, TabPanel } from "@headlessui/react";

import { cn } from "@/lib/utils";
import MediaDisplay from "./mediaType";


interface GalleryTabProps {
    url: string;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
    url
}) => {
    return (
        <TabPanel
            className=""
        >
            {({ selected }) => (
               
                    <span className={cn(
                            'absolute inset-0 rounded-md ring-2 ring-offset-2 w-full h-full ',
                            selected ? 'ring-black' : 'ring-transparent',)}>
                                {/* <NextImage src="https://picsum.photos/200/300" alt=" test " fill  /> */}
                        {/* <NextImage
                            fill
                            src={url}
                            alt=""
                            className="object-cover object-center"
                        /> */}
                        <MediaDisplay url={url} />
                      
                      
                    </span>
        
            )}
        </TabPanel>
    );
}

export default GalleryTab;
