var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry:{
    App:__dirname + "/src/resource/script/App.js"
//	  App:__dirname + "/src/test/index.js"
  }
  ,//已多次提及的唯一入口文件
  output: {
//	  path:__dirname+ "/src/test",
//	  filename: '[name].js',
    path: __dirname + "/build/resource/dist",//打包后的文件存放的地方
    filename: "script/[name].js",//打包后输出文件的文件名
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
　　　　　　test: /\.(png|jpg|gif)$/,
　　　　　　loader: 'url-loader?limit=100&name=images/[hash:8].[name].[ext]'
　　　　},
      // {
      //     test: /\.(htm|html)$/i,
      //     loader: 'html-withimg-loader'
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
         fallback: "style-loader",
         use: "css-loader"
       })
      },
      {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
         query: {
           presets: ['react', 'es2015']
         }
       }
    ]
  },
  plugins:[
    // new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
    //     filename:  __dirname + '/build/page/index/index.html', //生成的html存放路径，相对于 path
    //     template:  __dirname + '/src/page/index/index.html', //html模板路径
    //     hash:false
    // }),
    new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
        filename:  __dirname + '/build/page/index/App.html', //生成的html存放路径，相对于 path
        template:  __dirname + '/src/page/index/index.html', //html模板路径
        hash:false
    }),
    // new HtmlWebpackPlugin({
    //     template: 'html-withimg-loader!' + path.resolve(__dirname+"/src/page/", "index.html"),
    //     filename:  __dirname + '/build/page/index.html'
    // }),
    new ExtractTextPlugin("[name].css"),
  ]
}
