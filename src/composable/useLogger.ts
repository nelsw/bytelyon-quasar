enum Symbol {
  bug = `🐞`,
  info = `✅`,
  warn = `⚠️`,
  err = `❌`,
}

const build = (s: Symbol, u: unknown, ...args: string[]): string => {
  let msg: string = `${s} ${args.join(' ')} `;
  if (u) {
    msg += JSON.stringify(u, null, 2);
  }
  return msg;
};

export function useLogger() {
  const debug = (u: unknown, ...args: string[]) => console.debug(build(Symbol.bug, u, ...args));
  const info = (u: unknown, ...args: string[]) => console.info(build(Symbol.info, u, ...args));
  const warn = (u: unknown, ...args: string[]) => console.warn(build(Symbol.warn, u, ...args));
  const err = (e: Error, ...args: string[]) => console.warn(build(Symbol.err, e, ...args));

  return {
    debug,
    info,
    warn,
    err,
  };
}
