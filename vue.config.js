const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');


module.exports = {
  devServer: {
    watchOptions: {
      ignored: /src\/registry\.json/
    }
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'development') {
      console.log('PRERENDER');
      // mutate config for production...
      return {
        plugins: [
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: [ '/'],
          })
        ]
      }
    } else {
      // mutate for development...
    }
  }
}