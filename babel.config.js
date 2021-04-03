const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    ...plugins,
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }], // `style: true` 会加载 less 文件
  ],
  // presets: [
  //   ['@babel/preset-env', {
  //     modules: false,
  //     useBuiltIns: 'entry',
  //     corejs: 3
  //   }]
  // ],
};
