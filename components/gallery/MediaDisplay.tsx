import {
  MediaDisplayComponentsProps,
  MediaDisplayProps,
} from "@/types/interface";
import NextImage from "next/image";

const ImageComponent: React.FC<MediaDisplayComponentsProps> = ({ url }) => (
  <NextImage
    src={url}
    alt="Image"
    fill
    className="object-cover object-center"
  />
);
const VideoComponent: React.FC<MediaDisplayComponentsProps> = ({ url }) => (
  <video controls className="object-cover object-center h-full w-full">
    <source src={url} type="video/mp4" />
  </video>
);
const PdfComponent: React.FC<MediaDisplayComponentsProps> = ({ url }) => (
  <object data={url} type="application/pdf" className="h-full w-full">
    PDF Viewer not available
  </object>
);

// Main component to display media based on type
const MediaDisplay: React.FC<MediaDisplayProps> = ({ url, type }) => {
  // Function to determine the media type based on the URL
  // Example logic to determine media type based on file extension

  if (type.startsWith("image")) {
    return <ImageComponent url={url} />;
  } else if (type.startsWith("video")) {
    return <VideoComponent url={url} />;
  } else if (type.startsWith("application/pdf")) {
    return <PdfComponent url={url} />;
  } else {
    return <div>Unsupported media type</div>;
  }
};

export default MediaDisplay;
