import { RowElement } from '../components/RestFormEditor/types';

export type UrlParams = {
  params: { slug: string } | { slug: string[] };
  searchParams: { [key: string]: string };
};

export type Query = {
  id: string;
  type: 'rest' | 'graphql';
  method: string;
  url: string;
  encodedUrl: string;
  headers: RowElement[];
  variables: RowElement[];
  body: string;
  sdlUrl: string;
  jsonVariables: string;
};
