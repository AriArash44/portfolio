// import { useEducation } from '../hooks/useEducation';
import { usePagination } from '../hooks/usePagination';
import { ExpCard } from './ExpCard';
import { createGregorianDate, toJalali, formatJalali, formatGregorian } from '../utils/dateUtils';
import { useTheme } from '../contexts/themeContext/useTheme';

const educations = [
    {
        logo: "Sampad.svg",
        fa: {
            title: "مدرسه سمپاد",
            level: "دبیرستان",
            start: "2017 9",
            end: "2020 8",
            descipline: "ریاضی - فیزیک",
            score: "19.5",
            explanation: "قبولی مرحله اول المپیاد دانش‌آموزی ریاضی و مرحله دوم المپیاد دانش‌آموزی کامپیوتر"
        },
        en: {
            title: "Sampad school",
            level: "High school",
            start: "2017 9",
            end: "2020 8",
            descipline: "Math - Physics",
            score: "19.5",
            explanation: "Qualified for the first round of the Mathematics Olympiad and the second round of the Computer Science Olympiad for students"
        }
    },
    {
        logo: "AUT.svg",
        fa: {
            title: "دانشگاه امیرکبیر",
            level: "کارشناسی",
            start: "2020 9",
            end: "2025 8",
            descipline: "مهندسی کامپیوتر",
            score: "16.66",
            explanation: "تدریسیار دروس سیستم‌ عامل و برنامه نویسی اندروید"
        },
        en: {
            title: "Amirkabir university",
            level: "Bachelor",
            start: "2020 9",
            end: "2025 8",
            descipline: "Computer Engineering",
            score: "16.66",
            explanation: "Teaching Assistant of Operating Systems & Android Programming Course"
        }
    },
    {
        logo: "KNTU.svg",
        fa: {
            title: "دانشگاه خواجه نصیر",
            level: "کارشناسی ارشد",
            start: "2025 9",
            end: "2027 8",
            descipline: "هوش مصنوعی",
            score: "؟؟؟",
            explanation: "به صورت الکترونیکی، بدون نداخل با کار تمام‌وقت"
        },
        en: {
            title: "Khaje Nasir university",
            level: "Master",
            start: "2025 9",
            end: "2027 8",
            descipline: "Artificial intelligence",
            score: "TBD",
            explanation: "Online courses, without interference with full-time work"
        }
    }
];

interface EducationCardProps {
    lang: string;
}

export function EducationCard({ lang }: EducationCardProps) {
    const { dark } = useTheme();
    const { page, next, prev, goTo } = usePagination(0);


    // const { data, isLoading, error } = useEducation(page, lang);
    // if (isLoading || error || !data) {
    //     return <div className="loader m-auto my-10" />;
    // }
    // if (error) {
    //     console.log((error as Error).message);
    // }
    // const totalPages = data.pages_num;


    const baseEduc = educations[page];
    const data = {
        ...baseEduc,
        ...baseEduc[lang as 'fa' | 'en'],
        logo: import.meta.env.BASE_URL.concat(`logos/${baseEduc.logo}`),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).en;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any).fa;
    const totalPages = educations.length;


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
        <div className='flex justify-center items-center gap-3'>
          {page !== 0 && <button 
            onClick={prev}
            className="cursor-pointer relative transition-all duration-300 mt-3 rounded-full text-xs text-gray-600 dark:text-gray-800">
              <img className={`w-3 h-3 ${lang === "fa" ? "rotate-180" : ""}`} src={dark ? `${import.meta.env.BASE_URL}icons/w_prev.png` : `${import.meta.env.BASE_URL}icons/prev.png`} alt='prev' />
          </button>}
          <div className="flex justify-center mt-4 space-x-3 mb-1">
            {Array.from({length: totalPages}, (_, i) => i).map((_, index) => (
              <button 
              key={index} 
              onClick={() => goTo(index, totalPages)}
              className={`cursor-pointer relative transition-all duration-300 w-6 h-6 rounded-full text-xs
              ${index === page ? 'scale-125 bg-custom-gold' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          {page !== totalPages - 1 && <button 
            onClick={() => next(totalPages)}
            className="cursor-pointer relative transition-all duration-300 w-6 h-6 mt-3 rounded-full text-xs text-gray-600 dark:text-gray-800">
              <img className={`w-3 h-3 ${lang === "fa" ? "rotate-180" : ""}`} src={dark ? `${import.meta.env.BASE_URL}icons/w_next.png` : `${import.meta.env.BASE_URL}icons/next.png`} alt='next' />
          </button>}
        </div>
      </>
    );
}
