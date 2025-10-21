import { useQuery } from '@tanstack/react-query';

type EducationResponse = {
    logo: string;
//   title?: string;
//   description?: string;
    pages_num: number;
};

const fetchEducation = async (level: number, lang: string): Promise<EducationResponse> => {
    const response = await fetch(`/api/educations?level=${level}&lang=${lang}`);
    if (!response.ok) {
        throw new Error('Failed to fetch education data');
    }
    return response.json();
};

export const useEducation = (level: number, lang: string) => {
    return useQuery({
        queryKey: ['education', level, lang],
        queryFn: () => fetchEducation(level, lang),
        enabled: level >= 0,
    });
};
