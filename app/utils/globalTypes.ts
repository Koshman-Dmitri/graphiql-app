export type UrlParams = {
  params: { slug: string } | { slug: string[] };
  searchParams: { [key: string]: string };
};
