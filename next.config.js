require('dotenv').config({ path: './.env.' + `${process.env.REACT_APP_ENV}` })
const path = require('path')
const withPlugins = require('next-compose-plugins');
const webpack = require('webpack')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const withPreact = require('@zeit/next-preact')

module.exports  = {
    publicRuntimeConfig: { // Will be available on both server and client
      appId: '7e5aa49fe21449cdbbfc8fc33070185a'
    },
    useFileSystemPublicRoutes: true,
    webpack: (config, {defaultLoaders, isServer, buildId, dev}) => {
      config.module.rules.push(
        {
          test: /\.css$/,
          use: [
           {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                extends: path.resolve(__dirname, './.babelrc'),
              },
            },
            {
              loader: 'emit-file-loader',
              options: {
                name: 'dist/[path][name].[ext].js',
              },
            },
            'styled-jsx-css-loader',
          ],
        }
      );
      config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
      new SWPrecacheWebpackPlugin({
        verbose: true,
        filepath: path.resolve('./static/service-worker.js'),
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: '/',
            options: {
              cache: {
                name: 'html-home'
              }
            }
          },
          {
            urlPattern: /\/home_page\//,
            handler: 'fastest',
            options: {
              cache: {
                maxEntries: 20,
                name: 'home-page-cache'
              }
            }
          }
        ]
      })
    )
      return config;
    }
};

/*
   Added preact for Production mode only
*/
module.exports = ( process.env.REACT_APP_ENV === 'production' ) ? 
                    withPreact(module.exports) : module.exports;