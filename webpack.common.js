const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');

module.exports = {
  entry: `${SRC_DIR}/index.tsx`,
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$|\.es6|\.tsx$/,
        exclude: /node_modules/
      },
      {
        test: /\.svg(\?.*$|$)/,
        use: [
          { loader: '@svgr/webpack', options: {} },
          { loader: 'url-loader', options: { limit: 8192 } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      src: path.resolve(__dirname, 'src'),
    }
  }
};
