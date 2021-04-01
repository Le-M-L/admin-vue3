let path = require('path');

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { generateModifyVars } = require('./build/config/themeConfig');
const ThemeColorReplacer = require('webpack-theme-color-replacer'); //主题配置
const { resolveCss } = require('./build/config/theme-color-replacer-extend');

const productionGzipExtensions = ['js', 'css'];
const isProd = process.env.NODE_ENV === 'production'; //是否为正式环境

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    nprogress: 'NProgress',
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@3.0.10/dist/vue.global.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@4.0.5/dist/vue-router.global.min.js',
    '//cdn.jsdelivr.net/npm/vuex@4.0.0/dist/vuex.global.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
  ],
};

module.exports = {
  publicPath: isProd ? '/' : '/',
  //输出文件按目录名
  outputDir: 'admin',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
        globalVars: {
          ...generateModifyVars(),
        },
      },
    },
  },
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  filenameHashing: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      //设置全局样式文件
      patterns: [path.resolve(__dirname, './src/design/config.less')],
      injector: 'append',
    },
  },
  configureWebpack: (config) => {
    // Ignore all locale files of moment.js
    // config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // 生产环境下将资源压缩成gzip格式
    if (isProd) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        // matchColors: generateModifyVars(),
        injectCss: true,
        resolveCss,
      })
    );
    // 正式环境下 externals
    // if (isProd) {
    //   config.externals = assetsCDN.externals;
    // }
    // config.module.rules.push({
    //   test: /\.vue$/,
    //   use: [
    //     {
    //       loader: 'vue-windicss-preprocess',
    //       options: {
    //         config: 'tailwind.config.js', // tailwind config file path OR config object (optional)
    //         compile: false, // false: interpretation mode; true: compilation mode
    //         globalPreflight: true, // set preflight style is global or scoped
    //         globalUtility: true, // set utility style is global or scoped
    //         prefix: 'windi-', // set compilation mode style prefix
    //       },
    //     },
    //   ],
    // });
  },
  chainWebpack: (config) => {
    // 生产环境下使用CDN
    // if (isProd) {
    //   config.plugin('html').tap((args) => {
    //     args[0].cdn = assetsCDN;
    //     return args;
    //   });
    // }
    // 移除 prefetch 插件
    // config.plugins.delete('preload');
    // config.plugins.delete('prefetch');
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    host: 'localhost',
    port: 8888,
    https: false,
    hotOnly: false,
    proxy: {
      '/test': {
        target: 'http://test.com/',
        timeout: 3000,
        changeOrigin: true,
      },
    },
    before: (app) => {},
  },
};
