var path = require( 'path' );
module.exports = {
   devtool: '#inline-source-map',
   entry: './src/app.js',
   output: {
       path: './bin',
       filename: 'app.bundle.js'
   },
   resolve: {
     alias: {
       'react-native': 'react-native-web',
       'spotcontrol': path.resolve( __dirname, 'src', 'spotcontrol_web.js'),
       'imageShared': path.resolve( __dirname, 'src', 'components', 'imageChrome.js')
     }
   },
   module: {
     loaders: [
       {
         test: /\.js$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel', // 'babel-loader' is also a legal name to reference
       }
     ]
   }
};
