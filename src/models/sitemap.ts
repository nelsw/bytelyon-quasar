export interface SitemapProps {
  id: string;
  domain: string;
  end: string;
  start: string;
  tracked: string[];
  url: string;
  visited: string[];

  duration(): number;
  visitedCount(): number;
  trackedCount(): number;
  totalUrlCount(): number;
}

