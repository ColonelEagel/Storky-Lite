// Import necessary components and utilities

/**
 * Import the TabPanel component from the @headlessui/react library.
 * This component is used for rendering a tab panel.
 */
import { TabPanel } from "@headlessui/react";

/**
 * Import the cn function from the @/lib/utils module.
 * This function is used for constructing class names.
 */
import { cn } from "@/lib/utils";

/**
 * Import the MediaDisplay component from the current directory.
 * This component is used for rendering media display.
 */
import MediaDisplay from "./MediaDisplay";

/**
 * Import the MediaDisplayProps interface from the @/types/interface module.
 * This interface defines the props that the MediaDisplay component expects.
 */
import { MediaDisplayProps } from "@/types/interface";
/**
 * Component for rendering a gallery tab panel.
 * This component is used to display a media item in a gallery tab.
 */
const GalleryTab: React.FC<MediaDisplayProps> = ({ url, type }) => {
  /**
   * Render a gallery tab panel.
   * The panel is selected if the URL is defined.
   * The panel has a border and a ring when selected.
   * The media display component is rendered within the panel.
   *
   * @return {JSX.Element} The gallery tab panel component.
   */
  return (
    <>
      {url && ( // Render the panel only if the URL is defined
        <TabPanel className="">
          {({ selected }) => (
            <span
              className={cn(
                "absolute inset-0 rounded-md w-full h-full border-zinc-100 border-2",
                selected ? "ring-black" : "ring-transparent"
              )}
            >
              {/* Render the media display component */}
              <MediaDisplay url={url} type={type} />
            </span>
          )}
        </TabPanel>
      )}
    </>
  );
};

export default GalleryTab;
