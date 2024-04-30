
import { links } from '@/data/data';
import Link from 'next/link';
import React from 'react'



function NavLinks() {


//todo: add active class to the current link

    return (
        <>
            {links.map((item) => (
                <Link href={item.href} key={item.id} className="">
                    {item.title}
                </Link>
            ))}
        </>
    )
}


export default NavLinks

