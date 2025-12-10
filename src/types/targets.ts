export type Targets = Map<string, boolean>;
export const FollowTargetsCsv = (t: Targets): string => targetsCsv(t, true);
export const IgnoreTargetsCsv = (t: Targets): string => targetsCsv(t, false);

const targetsCsv = (t: Targets, follow: boolean): string =>
  Object.entries(t)
    .filter((e) => e[1] === follow)
    .map((e) => e[0])
    .join(', ');
