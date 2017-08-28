const path = require('path');

const env = process.env.WEBPACK_ENV;
const libraryName = 'electre';

let extension = '.js';

if (env === 'build') {
  extension = '.min.js';
}

const nodeConfig = {
  entry: path.resolve(__dirname, 'src/electre.node.js'),
  // Compile for usage in a Node.js-like environment (uses Node.js require to load chunks)
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: `electre.node${extension}`,
    library: libraryName,
    // Export by setting module.exports: module.exports = xxx
    libraryTarget: 'commonjs2',
  },
  // imported from the environment during runtime
  externals: {
    tinyWorker: 'tiny-worker',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
};

const webConfig = {
  entry: path.resolve(__dirname, 'src/electre.web.js'),
  // Compile for usage in a browser-like environment
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: `electre.web${extension}`,
    library: libraryName,
    // Export to AMD, CommonJS2 or as property in root
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      // worker loader module for webpack
      {
        test: /\worker.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              inline: false,
              name: `[name]${extension}`,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
};

module.exports = [
  nodeConfig,
  webConfig,
];
