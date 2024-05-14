import { cn } from '@/lib/utils';
import React from 'react';

interface HeaderComponentProps {
    title?: string;
    text?: string;
    className?: string;
}

const HeaderComponent = ({ title, text, className }: HeaderComponentProps): JSX.Element => {
    return (
        <div className={cn('uppercase mx-auto mb-20 px-5 py-3 text-3xl w-fit relative', className)}>
            <h2 className="main-title uppercase mx-auto border-2 border-black px-5 py-3 text-xl md:text-3xl w-fit relative z-10 transition duration-300 ease-in-out hover:delay-500">
                {title}
            </h2>
            <p className="uppercase mx-auto px-5 text-center py-3 text-sm md:text-xl w-fit text-nowrap">{text}</p>
        </div>
    );
};

export default HeaderComponent;