import { useEducation } from '../hooks/useEducation';
import { usePagination } from '../hooks/usePagination';
import { ExpCard } from './ExpCard';
import { createGregorianDate, toJalali, formatJalali, formatGregorian } from '../utils/dateUtils';

interface EducationCardProps {
    lang: string;
}

export function EducationCard({ lang }: EducationCardProps) {
    const { page, next, prev } = usePagination(0);
    const { data, isLoading, error } = useEducation(page, lang);
    if (isLoading || error || !data) {
        return <div className="loader" />;
    }
    if (error) {
        console.log((error as Error).message);
    }
    const totalPages = data.pages_num;
    return (
      <>
        <ExpCard logo={data.logo} title={data.title.concat(` (${data.level})`)}
        date={lang === "en" ? `${formatGregorian(createGregorianDate(parseInt(data.start.split(" ")[0]), parseInt(data.start.split(" ")[1])), "MMMM YYYY")} - ${formatGregorian(createGregorianDate(parseInt(data.end.split(" ")[0]), parseInt(data.end.split(" ")[1])), "MMMM YYYY")}` : 
        `${formatJalali(toJalali(createGregorianDate(parseInt(data.start.split(" ")[0]), parseInt(data.start.split(" ")[1]))), "jMMMM jYYYY")} - ${formatJalali(toJalali(createGregorianDate(parseInt(data.end.split(" ")[0]), parseInt(data.end.split(" ")[1]))), "jMMMM jYYYY")}`}>
          <ul className='list-disc list-inside px-2'>
            <li>{data.descipline}</li>
            <li>{data.score}</li>
            <li>{data.explanation}</li>
          </ul>
        </ExpCard>

        {/* here we must fix UI of pagination(maybe with a component) */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prev}
            disabled={page <= 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => next(totalPages)}
            disabled={page + 1 >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </>
    );
}
