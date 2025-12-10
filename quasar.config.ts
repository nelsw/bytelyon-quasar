// noinspection JSUnusedGlobalSymbols (export default)
// Configurations: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';

export default defineConfig(() => {
  return {
    sourceFiles: {
      electronMain: './src-electron/electron-main',
    },
    animations: 'all',
    boot: ['axios', 'quasar-icon-set'],
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
        // Public API
        API: 'https://api.bytelyon.com',
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
      port: 8080,
      open: true, // opens browser window automatically
    },
    framework: {
      config: {
        dark: true,
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
      bundler: 'builder', // 'packager' or 'builder'
      packager: {},
      builder: {
        appId: 'bytelyon-quasar',
      },
    },
  };
});
