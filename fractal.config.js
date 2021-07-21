'use strict'

const path = require('path')
const fractal = (module.exports = require('@frctl/fractal').create())
const mandelbrot = require('@frctl/mandelbrot')

//  Default settings
fractal.set('project.title', 'TailwindCSS form elements')

fractal.docs.set('default.context', {
  'site-name': 'TailwindCSS UI',
})
// fractal.docs.set('indexLabel', 'Listing')
// fractal.docs.set('label', 'Pages documentation')
// fractal.docs.set('title', 'Pages documentation')

/*
 * Components
 */
const nunj = require('@frctl/nunjucks')({
  env: {
    // Nunjucks environment opts: https://mozilla.github.io/nunjucks/api.html#configure
  },
  filters: {
    // filter-name: function filterFunc(){}
  },
  globals: {
    // global-name: global-val
  },
  extensions: {
    // extension-name: function extensionFunc(){}
  },
})

fractal.components.set('path', path.join(__dirname, 'components'))
fractal.components.engine(require('@frctl/nunjucks'))
fractal.components.set('ext', '.njk')

/*
 * Documentation
 */
fractal.docs.set('path', path.join(__dirname, 'docs'))
fractal.docs.engine(require('@frctl/nunjucks'))

/*
 * Assets
 */
fractal.web.set('static.path', path.join(__dirname, 'public'))

/**
 * Build
 */
fractal.web.set('builder.dest', path.join(__dirname, 'dist'))

/*
 * Theme
 */
fractal.web.theme(
  mandelbrot({
    skin: {
      name: 'aqua',
      //   accent: '#C23582',
      //   complement: '#FFFFFF',
      //   links: '#C23582',
    },
    information: [
      {
        label: 'Version',
        value: require('./package.json').version,
      },
      {
        label: 'Built on',
        value: new Date(),
        type: 'time',
        format: (value) => {
          return value.toLocaleDateString('en')
        },
      },
      {
        label: 'Source',
        value: `<a href="https://csscoder.pro" target="_blank">csscoder.pro</a>`,
      },
      {
        label: 'Created by',
        value: `<a href="https://csscoder.pro" target="_blank">csscoder.pro</a>`,
      },
      {
        label: 'Based on',
        value: `<a href="https://fractal.build/" target="_blank">Fractal</a>`,
      },
    ],
  })
)
