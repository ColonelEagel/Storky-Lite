import { MediaDisplayProps } from "@/interface/interface";
import NextImage from "next/image";

const ImageComponent: React.FC<MediaDisplayProps> = ({ url }) => (
    <NextImage src={url} alt="Image" fill className="object-cover object-center"/>
);
const VideoComponent: React.FC<MediaDisplayProps> = ({ url }) => (
    <video controls  className="object-cover object-center h-full w-full">
        <source src={url} type="video/mp4" />
    </video>
);
const PdfComponent: React.FC<MediaDisplayProps> = ({ url }) => (
    <object data={url} type="application/pdf" className="h-full w-full">
        PDF Viewer not available
    </object>
);

// Main component to display media based on type
const MediaDisplay: React.FC<MediaDisplayProps> = ({ url }) => {

// Function to determine the media type based on the URL
    // Example logic to determine media type based on file extension
    const fileExtension = url.split(".").pop()?.toLowerCase();
console.log(fileExtension)
    if (fileExtension!==undefined && ["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        return <ImageComponent url={url} />;
    } else if (fileExtension === "mp4") {
        return <VideoComponent url={url} />;
    } else if (fileExtension === "pdf") {
        return <PdfComponent url={url} />;
    } else {
        return <div>Unsupported media type</div>;
    }
    
};

export default MediaDisplay;
