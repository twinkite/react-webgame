const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  name: 'mineSearch',
  mode: 'development', // 실서비스 : production
  devtool: 'eval',
  resolve: {
      extensions: ['.js', '.jsx'] // 확장자를 일일히 입력하ㅐ줄 필요가 없도록 해준다. 
  },
  entry: {
      app: './client',    // 다른 파일이 불러오고 있는 파일은 불러올 필요가 없음.
  }, //입력

  module: {
      rules:[{
          test: /\.jsx?/,
          loader: 'babel-loader',
          options:{
              presets: [
                  ['@babel/preset-env', {
                      targets: {
                          browsers: ['> 1% in KR'],   // browserslist
                      },
                      debug: true
                  }],
                  '@babel/preset-react',
              ],
              plugins:[
                  'react-refresh/babel',
              ],
          }            
      }]
  },
  plugins: [
      new webpack.LoaderOptionsPlugin({ debug:true }),
      new RefreshWebpackPlugin(),
  ],
  output: {
      path: path.join(__dirname, 'dist'), // __dirname : 현재 폴더 안에있는 , 'dist' : dist 폴더. 현재 폴더 안의 dist폴더를 의미.
      filename: 'app.js',
      publicPath: '/dist/', 
  }, //출력
  devServer:{
      publicPath:'/dist/',
      hot:true,
      port:3000,
  }
};