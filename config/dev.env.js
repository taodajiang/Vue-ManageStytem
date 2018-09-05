'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //测试环境地址
    //BASE_API: '"http://hxecshopmanapi2.tech.jojojr.cn/"',
    BASE_API: '"http://61.183.91.94:3001/app/mock/40/"',
})