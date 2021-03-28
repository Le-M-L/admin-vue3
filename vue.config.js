let path = require('path');

// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { generateModifyVars } = require('./build/config/themeConfig');
const ThemeColorReplacer = require('webpack-theme-color-replacer'); //主题配置
const { resolveCss } = require('./build/config/theme-color-replacer-extend');
console.log(generateModifyVars());
const productionGzipExtensions = ['js', 'css'];
const isProd = process.env.NODE_ENV === 'production'; //是否为正式环境

module.exports = {
  publicPath: isProd ? '/' : '/',
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
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     algorithm: 'gzip',
      //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      //     threshold: 10240,
      //     minRatio: 0.8,
      //   })
      // );
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        // matchColors: generateModifyVars(),
        injectCss: true,
        resolveCss,
      })
    );
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
  chainWebpack: (config) => {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    // 查阅 参数描述 https://github.com/chimurai/http-proxy-middleware
    proxy: {
      '/test': {
        target: 'http://test.com/',
        // pathRewrite: {
        //   '^/test': '',
        // },
        timeout: 3000,
        changeOrigin: true,
      },
    },
    before: (app) => {},
  },
};
