import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link"
type LogoProps = {
    className?: string;
};

function Logo({ className: className }: LogoProps): JSX.Element {
    return (
        <div className={cn("", className)}>
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={50} height={50} />
            </Link>
        </div>
    );
}


export default Logo