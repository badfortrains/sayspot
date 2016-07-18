 module.exports = {
     entry: './src/app.js',
     output: {
         path: './bin',
         filename: 'app.bundle.js'
     },
     resolve: {
       alias: {
         'react-native': 'react-native-web'
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
