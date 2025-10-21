import { http, HttpResponse } from 'msw';
import { educations } from './mockData';

type Lang = 'fa' | 'en';

export const handlers = [
  http.get('/api/educations', ({ request }) => {
    try {
      const url = new URL(request.url);
      const levelParam = url.searchParams.get('level');
      const lang = (url.searchParams.get('lang') as Lang) || 'en';
      if (!levelParam) {
        return HttpResponse.json({ error: 'Missing level param' }, { status: 400 });
      }
      const level = parseInt(levelParam, 10);
      const baseEduc = educations[level];
      if (!baseEduc) {
        return HttpResponse.json({ error: 'Invalid level' }, { status: 404 });
      }
      const result = {
        ...baseEduc,
        ...baseEduc[lang],
        logo: import.meta.env.BASE_URL.concat(`logos/${baseEduc.logo}`),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (result as any).en;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (result as any).fa;

      return HttpResponse.json({
        ...result,
        pages_num: educations.length
      });
    } catch (err) {
      console.error('MSW handler failed:', err);
      return HttpResponse.json({ error: 'Internal mock error' }, { status: 500 });
    }
  }),
];
