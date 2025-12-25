import { type Result } from 'src/types/result';

export const enum ResultType {
  SPONSORED,
  ORGANIC,
  VIDEOS,
  FORUMS,
  ARTICLES,
}

export const Name = (t: ResultType) => {
  switch (t) {
    case ResultType.SPONSORED:
      return 'Sponsored';
    case ResultType.ORGANIC:
      return 'Organic';
    case ResultType.VIDEOS:
      return 'Videos';
    case ResultType.FORUMS:
      return 'Forums';
    case ResultType.ARTICLES:
      return 'Articles';
  }
};

export const ResultTypes = [
  ResultType.ORGANIC,
  ResultType.SPONSORED,
  ResultType.VIDEOS,
  ResultType.FORUMS,
  ResultType.ARTICLES,
];

export interface Results {
  sponsored: Result[];
  organic: Result[];
  video: Result[];
  forum: Result[];
  article: Result[];
}

export const ResultsLength = (t: ResultType, r?: Results): number => {
  if (!r) {
    return 0;
  }
  switch (t) {
    case ResultType.SPONSORED:
      return r.sponsored?.length ?? 0;
    case ResultType.ORGANIC:
      return r.organic?.length ?? 0;
    case ResultType.VIDEOS:
      return r.video?.length ?? 0;
    case ResultType.FORUMS:
      return r.forum?.length ?? 0;
    case ResultType.ARTICLES:
      return r.article?.length ?? 0;
  }
};
