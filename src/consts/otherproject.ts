import type { CarouselImage } from "../components/Carousel";

const baseURL = import.meta.env.BASE_URL;

export const otherDesktopImages: CarouselImage[] = [
    { src: `${baseURL}images/otherprojects/project-details.png`, alt: 'project details' },
    { src: `${baseURL}images/otherprojects/project-summary.png`, alt: 'project summary' },
    { src: `${baseURL}images/otherprojects/roshan-archive.png`, alt: 'roshan archive' },
    { src: `${baseURL}images/otherprojects/roshan-speech.png`, alt: 'roshan speech' },
    { src: `${baseURL}images/otherprojects/ubaar-new.png`, alt: 'ubaar new' },
    { src: `${baseURL}images/otherprojects/ubaar-view.png`, alt: 'ubaar view' },
];

export const otherMobileImages: CarouselImage[] = [
    { src: `${baseURL}images/otherprojects/mobile/project-details.png`, alt: 'project details' },
    { src: `${baseURL}images/otherprojects/mobile/project-summary.png`, alt: 'project summary' },
    { src: `${baseURL}images/otherprojects/mobile/roshan-archive.png`, alt: 'roshan archive' },
    { src: `${baseURL}images/otherprojects/mobile/roshan-speech.png`, alt: 'roshan speech' },
    { src: `${baseURL}images/otherprojects/mobile/ubaar-new.png`, alt: 'ubaar new' },
    { src: `${baseURL}images/otherprojects/mobile/ubaar-view.png`, alt: 'ubaar view' },
];
