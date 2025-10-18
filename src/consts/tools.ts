import type { TFunction } from 'i18next';
import i18n from "../i18n/i18n";

const baseUrl = import.meta.env.BASE_URL;
const lang = i18n.language;

export const getToolsData = (t: TFunction) => [
    {
        icon: `${baseUrl}icons/html.svg`,
        alt: "HTML5",
        title: "HTML",
        description: t("htmlE"),
        delay: "0",
        imgPadding: "0"
    },
    {
        icon: `${baseUrl}icons/css.svg`,
        alt: "CSS3",
        title: "CSS",
        description: t("cssE"),
        delay: "100",
        imgPadding: "0"
    },
    {
        icon: `${baseUrl}icons/javascript.svg`,
        alt: "JavaScript",
        title: "JavaScript",
        description: t("jsE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/typescript.svg`,
        alt: "TypeScript",
        title: "TypeScript",
        description: t("typescriptE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/react.svg`,
        alt: "React",
        title: "React",
        description: t("reactE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/tailwind.svg`,
        alt: "Tailwind",
        title: "Tailwind",
        description: t("tailwindE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/sass.svg`,
        alt: "Sass",
        title: "Sass",
        description: t("sassE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/git.svg`,
        alt: "Git",
        title: "Git",
        description: t("gitE"),
        delay: "200",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/other_tools.svg`,
        alt: "more tools",
        title: lang === "fa" ? "ابزارهای دیگر" : "more tools",
        description: t("moreE"),
        delay: "200",
        imgPadding: "10"
    }
];