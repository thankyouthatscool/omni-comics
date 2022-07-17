import path from "path";

export const parseComicPath = (comicPath: string) => {
  const { name } = path.parse(comicPath);

  const series = /^(?<series>.+)\s(#|Vol|Book)/i.exec(name);
  const issue = /(?<issue>#\d+|Vol\.\s\d+|Book\s\d+)/i.exec(name);
  const title = /(Vol. \d+\s|Book \d+\s)(?<title>[A-Za-z ]+)/i.exec(name);

  return {
    issue: issue?.groups?.issue!,
    series: series?.groups?.series!,
    title: title?.groups?.title,
  };
};
