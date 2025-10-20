import type { CarouselImage } from "../components/Carousel";

const baseURL = import.meta.env.BASE_URL;

export const otherDesktopImages: CarouselImage[] = [
    { src: `${baseURL}images/otherprojects/project-details.png`, alt: 'Bachelor project, details page', altfa: "پروژه کارشناسی، صفحه جزئیات" },
    { src: `${baseURL}images/otherprojects/project-summary.png`, alt: 'Bachelor project, summary page', altfa: "پروژه کارشناسی، صفحه خلاصه" },
    { src: `${baseURL}images/otherprojects/roshan-archive.png`, alt: 'Roshan project, archive page', altfa: "پروژه روشن، صفحه آرشیو" },
    { src: `${baseURL}images/otherprojects/roshan-speech.png`, alt: 'Roshan project, speech page', altfa: "پروژه روشن، صفحه ضبط" },
    { src: `${baseURL}images/otherprojects/ubaar-new.png`, alt: 'Ubaar project, new page', altfa: "پروژه اوبار، صفحه ثبت" },
    { src: `${baseURL}images/otherprojects/ubaar-view.png`, alt: 'Ubaar project, view page', altfa: "پروژه اوبار، صفحه داشبورد" },
];

export const otherMobileImages: CarouselImage[] = [
    { src: `${baseURL}images/otherprojects/mobile/project-details.png`, alt: 'Bachelor project, details page', altfa: "پروژه کارشناسی، صفحه جزئیات" },
    { src: `${baseURL}images/otherprojects/mobile/project-summary.png`, alt: 'Bachelor project, summary page', altfa: "پروژه کارشناسی، صفحه خلاصه" },
    { src: `${baseURL}images/otherprojects/mobile/roshan-archive.png`, alt: 'Roshan project, archive page', altfa: "پروژه روشن، صفحه آرشیو" },
    { src: `${baseURL}images/otherprojects/mobile/roshan-speech.png`, alt: 'Roshan project, speech page', altfa: "پروژه روشن، صفحه ضبط" },
    { src: `${baseURL}images/otherprojects/mobile/ubaar-new.png`, alt: 'Ubaar project, new page', altfa: "پروژه اوبار، صفحه ثبت" },
    { src: `${baseURL}images/otherprojects/mobile/ubaar-view.png`, alt: 'Ubaar project, view page', altfa: "پروژه اوبار، صفحه داشبورد" },
];
