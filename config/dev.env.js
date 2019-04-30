'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH: '"http://localhost:3000"'
  // http://localhost:3000
  // https://nameless-forest-65777.herokuapp.com
  // APIPATH: '"https://vue-course-api.hexschool.io"'
  // CUSTOMPATH: '"expectkoo"'
})
