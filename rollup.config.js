import PurgeIcons from 'rollup-plugin-purge-icons';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
};
