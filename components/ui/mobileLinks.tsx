import { links } from '@/data/data';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import LoginButton from './loginButton';


function MobileLinks({ onClick }:{ onClick?: () => void }) {

    const pathname = usePathname(); 
    console.log(pathname)
    return (
        <>
            {links.map((item) => (
                <Link href={item.href} key={item.id} onClick={onClick ? () => onClick() : undefined} className={pathname === item.href ? 'text-cyan-500' : 'text-white'}>
                    {item.title}
                </Link>
            ))}
            <LoginButton />
        </>
    )
}


export default MobileLinks

