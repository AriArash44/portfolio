import {useFloating, offset, flip, shift, useClick, useInteractions, autoUpdate, useDismiss } from '@floating-ui/react';
import { useState } from 'react';
import { useTheme } from '../contexts/themeContext/useTheme';
import i18n from "../i18n/i18n";

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
    const { dark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const lang = i18n.language.split("-")[0];
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
        transition-all duration-700 delay-${props.delay} mt-3 mx-auto w-4/5`}>
            <img src={props.icon} alt={props.alt} className={`h-20 w-20 pad-px-${props.imgPadding}`}/>
            <div className='flex flex-col gap-2.5 sm:gap-1.5'>
                <h3 className="text-custom-dark-gray dark:text-custom-light-gray">{props.title}</h3>
                <p className="hidden sm:block text-custom-second-dark-gray dark:text-custom-second-light-gray">{props.description}</p>
                <img ref={refs.setReference} {...getReferenceProps()}
                className={`relative cursor-pointer sm:hidden w-6 h-6 hover:opacity-50 transition-opacity rounded-full border-1 p-1
                ${lang === "fa" ? "scale-x-[-1]" : "" }`} src={dark ? `${import.meta.env.BASE_URL}icons/w_question_mark.svg` : 
                `${import.meta.env.BASE_URL}icons/question_mark.svg`} alt="?" />
            </div>
            {isOpen && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}
                className="bg-gray-600 text-white px-3 py-2 rounded text-sm z-50 max-w-xs shadow-2xl">
                    {props.description}
                    <div className="absolute w-2 h-2 bg-gray-600 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
            )}
        </div>
    );
}