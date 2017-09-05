const path = require('path');
const webpack = require('webpack');

const env = process.env.WEBPACK_ENV;
const libraryName = 'electre';
const plugins = [];
let extension = '.js';
let devtool = 'inline-source-map';

if (env === 'build' || env === 'cov') {
  extension = '.min.js';
  if (env === 'build') {
    devtool = 'cheap-module-source-map';
  } else {
    plugins.push('istanbul');
    devtool = false;
  }
}

const nodeConfig = {
  devtool,
  entry: path.resolve(__dirname, 'src/electre.node.js'),
  // Compile for usage in a Node.js-like environment (uses Node.js require to load chunks)
  target: 'node',
  // for tiny-worker to access its file worker.js
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: `electre.node${extension}`,
    library: libraryName,
    // Export by setting module.exports: module.exports = xxx
    libraryTarget: 'commonjs2',
  },
  // tiny-worker imported from the environment during runtime
  // since Joi is used only in workers, we don't have to declare it as external
  externals: [
    'tiny-worker',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      EXTENSION: JSON.stringify(extension),
    }),
  ],
};

const webConfig = {
  devtool,
  entry: path.resolve(__dirname, 'src/electre.web.js'),
  // Compile for usage in a browser-like environment
  target: 'web',
  // as of https://github.com/jeffbski/joi-browser/blob/master/webpack.config.js
  // in order to use joi in browser
  node: {
    global: true,
    Buffer: 'mock',
    crypto: 'empty',
    net: 'empty',
    dns: 'empty',
  },
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
        use: {
          loader: 'worker-loader',
          options: {
            inline: false,
            name: `workers/[name]${extension}`,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins,
          },
        },
      },
      {
        // In order to use Joi when need to babelify joi, isemail, hoek, and topo's lib
        test: /[\\/]node_modules[\\/](joi[\\/]lib[\\/]|isemail[\\/]lib[\\/]|hoek[\\/]lib[\\/]|topo[\\/]lib[\\/])/,
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
