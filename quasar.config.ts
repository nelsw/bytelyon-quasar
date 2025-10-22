// noinspection JSUnusedGlobalSymbols (export default)
// Configurations: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';
import type { UserConfig as ViteUserConfig } from 'vite';

export default defineConfig(() => {
  return {
    boot: ['axios', 'quasar-icon-set'],
    css: ['app.scss'],
    extras: ['mdi-v7'],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      typescript: {
        strict: true,
        vueShim: true,
      },
      vueRouterMode: 'history',
      env: {
        // public API endpoints
        API_CONTACT: 'https://yr6ej2omycqbeyidf7i6bum3oy0vqjuy.lambda-url.us-east-1.on.aws',
        API_JOB: 'https://3bzqwrfabt3przdzbtmihmkseq0lryxo.lambda-url.us-east-1.on.aws',
        API_LOGIN: 'https://ckkczji3hn6vnfintlkcf7b6vm0cfafl.lambda-url.us-east-1.on.aws',
        API_SITEMAP: 'https://nidtmhqsksaoszkp53smlyylt40vdlyc.lambda-url.us-east-1.on.aws',
        API_USER: 'https://b4idcozvm4a364rcexm6lmyyxm0flmaq.lambda-url.us-east-1.on.aws',
      },
      extendViteConf (viteConf: ViteUserConfig) {
        viteConf.resolve = {
          alias: {
            ['./runtimeConfig']: './runtimeConfig.browser'
          }
        }
      },
      viteVuePluginOptions: {

      },
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },
    devServer: {
      open: true, // opens browser window automatically
    },
    framework: {
      config: {
        dark: 'auto',
      },
      iconSet: 'svg-mdi-v7',
      // lang: 'en-US', // todo - language pack
      plugins: ['Notify', 'Loading', 'Dialog'],
    },
    ssr: {
      prodPort: 3000,
      middlewares: [
        'render', // keep this as last one
      ],
      pwa: false,
    },
    pwa: {
      workboxMode: 'GenerateSW',
    },
    capacitor: {
      // mip
      hideSplashscreen: true,
    },
    electron: {
      // wip
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager', // 'packager' or 'builder'
      packager: {},
      builder: {
        appId: 'bytelyon-quasar',
      },
    },
  };
});
