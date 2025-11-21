import type { ReactNode } from "react";

interface ExpCardProps {
    logo: string;
    title: string;
    date: string;
    children: ReactNode;
    imgClassName?: string;
}

export const ExpCard = ({logo, title, date, children, imgClassName}: ExpCardProps) => {
    return (
      <div className="w-4/5 bg-gray-50 dark:bg-gray-300 text-gray-900 m-auto mt-4 p-6
      shadow-[0px_-15px_15px_5px_rgba(0,0,0,0.05)] dark:shadow-gray-600/50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6">
          <img src={logo} alt={title} className={"w-20 h-20 rounded-full ".concat(imgClassName ?? "")} />
          <div>
            <h4 className="font-semibold ms-2 mt-2">
              {title.split("(")[0]}
              {title.split("(").length > 1 && 
                <span className="font-light italic text-gray-800"> {"("}{title.split("(")[1]}</span>
              }
            </h4>
            <p className="font-light ms-2 mt-1">{date}</p>
          </div>
        </div>
        { children }
      </div>
    )

}