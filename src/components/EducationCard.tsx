import { useEducation } from '../hooks/useEducation';
import { usePagination } from '../hooks/usePagination';

interface EducationCardProps {
  lang: string;
}

export function EducationCard({ lang }: EducationCardProps) {
  const { page, next, prev } = usePagination(0);
  const { data, isLoading, error } = useEducation(page, lang);
  if (isLoading) {
    return <div className="loader" />;
  }
  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
        <p className="text-red-600">{(error as Error).message}</p>
      </div>
    );
  }
  if (!data) return null;
  const totalPages = data.pages_num;
  return (
    <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={data.logo}
          alt="education logo"
          className="w-[40px] h-[40px] object-contain"
        />
      </div>
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
    </div>
  );
}
