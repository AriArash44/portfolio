import {useFloating, offset, flip, shift, useClick, useInteractions, autoUpdate, useDismiss } from '@floating-ui/react';
import { useState } from 'react';

interface ToolDescriptionProps {
    index: number;
    icon: string;
    alt: string;
    title: string;
    description: string;
    delay: string;
    imgPadding: string;
}

export const ToolDescription = (props: ToolDescriptionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'top',
        whileElementsMounted: autoUpdate,
        middleware: [offset(8), flip(), shift()],
    });
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);
    return (
        <div key={props.index} className={`scroll-animate flex items-center gap-3 opacity-0 translate-y-8 
        transition-all duration-700 delay-${props.delay} mt-1 mx-auto w-4/5`}>
            <div ref={refs.setReference} {...getReferenceProps()} className="relative">
                <img src={props.icon} alt={props.alt} className={`h-20 w-20 pad-px-${props.imgPadding} 
                cursor-pointer hover:opacity-80 transition-opacity`}/>
            </div>
            <div>
                <h3 className="text-custom-dark-gray dark:text-custom-light-gray">{props.title}</h3>
                <p className="hidden sm:block text-custom-second-dark-gray dark:text-custom-second-light-gray">{props.description}</p>
            </div>
            {isOpen && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}
                    className="bg-gray-900 text-white px-3 py-2 rounded text-sm z-50 max-w-xs shadow-lg">
                    More information about {props.title}
                    <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
            )}
        </div>
    );
}