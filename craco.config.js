/* craco.config.js */

const slash = require('slash2')
const WebpackBar = require('webpackbar')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CracoLessPlugin = require('craco-less')

module.exports = {
  babel: {
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': '#3F51B5'},
            // strictMath: true,
            // noIeCompat: true,
            javascriptEnabled: true,
          },
        },
        cssLoaderOptions: {
          modules: {
            getLocalIdent: (context, localIdentName, localName) => {
              if (
                context.resourcePath.includes('node_modules') ||
                context.resourcePath.includes('ant.design.pro.less') ||
                context.resourcePath.includes('global.less')
              ) {
                return localName
              }
              const match = context.resourcePath.match(/src(.*)/)
              if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '')
                const arr = slash(antdProPath)
                  .split('/')
                  .map(a => a.replace(/([A-Z])/g, '-$1'))
                  .map(a => a.toLowerCase())
                return `scizers-wt-${arr.join('-')}-${localName}`.replace(/--/g, '-')
              }
              return localName
            },
          },
        },
      },

    },
  ],
  // webpack: {
  //   configure: {
  //     plugins: [
  //       new WebpackBar({profile: true}),
  //     ],
  //   },
  // },
}
