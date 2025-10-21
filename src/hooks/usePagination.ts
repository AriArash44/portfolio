import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 0) => {
    const [page, setPage] = useState(initialPage);
    const next = useCallback((totalPages: number) => setPage((p) => (p + 1 < totalPages ? p + 1 : p)),[]);
    const prev = useCallback(() => setPage((p) => (p > 0 ? p - 1 : 0)), []);
    const goTo = useCallback((index: number, totalPages: number) => {
        if (index >= 0 && index < totalPages) setPage(index);
    }, []);
    return { page, setPage, next, prev, goTo };
};
