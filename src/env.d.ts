declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    API_JOB: string;
    API_LOGIN: string;
    API_SITEMAP: string;
    API_USER: string;
  }
}
