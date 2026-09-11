import type { TFunction } from 'i18next';
import i18n from "../i18n/i18n";

const baseUrl = import.meta.env.BASE_URL;
const lang = i18n.language;

export const getToolsData = (t: TFunction) => [
    {
        icon: `${baseUrl}icons/html_css.svg`,
        alt: "HTML & CSS",
        title: "HTML/CSS",
        description: t("htmlCssE"),
        delay: "0",
        imgPadding: "0"
    },
    {
        icon: `${baseUrl}icons/js_ts.svg`,
        alt: "JavaScript & TypeScript",
        title: "JS/TS",
        description: t("jsTsE"),
        delay: "100",
        imgPadding: "0"
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
        icon: `${baseUrl}icons/angular.svg`,
        alt: "Angular",
        title: "Angular",
        description: t("angularE"),
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
        icon: `${baseUrl}icons/golang.svg`,
        alt: "Golang",
        title: "Golang",
        description: t("golangE"),
        delay: "300",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/gin.svg`,
        alt: "Gin Framework",
        title: "Gin",
        description: t("ginE"),
        delay: "300",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/postgresql.svg`,
        alt: "PostgreSQL",
        title: "PostgreSQL",
        description: t("postgresE"),
        delay: "300",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/grpc.svg`,
        alt: "gRPC",
        title: "gRPC",
        description: t("grpcE"),
        delay: "400",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/git.svg`,
        alt: "Git",
        title: "Git",
        description: t("gitE"),
        delay: "400",
        imgPadding: "10"
    },
    {
        icon: `${baseUrl}icons/docker.svg`,
        alt: "Docker",
        title: "Docker",
        description: t("dockerE"),
        delay: "400",
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
