const glob = require('glob')
const path = require('path')
const fs = require('fs')
const env = process.env
const LocalConfig = require('../config.js')
const platformResource = LocalConfig.assets[LocalConfig.platform]
const INDEX = env.INDEX

function getTemplates() {
    let result = {}
    glob.sync('./src/entry/**/index.html').forEach(dir => {
        const chunk = dir.split('./src/entry/')[1].split('/index.html')[0]

        result[chunk] = dir
    })

    return result
}

function getPages() {
    const TPL = getTemplates()
    let pages = {}
    glob.sync('./src/entry/**/main.js').forEach(dir => {
        const chunk = dir.split('./src/entry/')[1].split('/main.js')[0]
        const entry = path.resolve(__dirname, '..', dir.split('main.js')[0])
        const configDIR = path.join(entry, './config.json')
        const template = TPL[chunk] || 'public/index.html'
        const config = require(configDIR)
        const title = config.title || ''

        pages[chunk] = {
            entry: dir,
            title,
            template,
        }
    })

    // console.log('INDEX',INDEX)
    if (INDEX && pages[INDEX]) {
        pages[INDEX]['filename'] = 'index.html'
        pages = {
            [INDEX]: pages[INDEX],
        }
    }
    // console.log('pages',pages)
    return pages
}

function handleHtml(config = {}, pages) {
    // 单页面
    if (pages === null) {
        config.plugins.delete(`prefetch`)

        config.plugin('html').tap(args => {
            args[0].title = LocalConfig.title
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = platformResource.cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = platformResource.cdn.dev
            }
            return args
        })
    } else {
        Object.keys(pages).forEach(key => {
            config.plugins.delete(`prefetch-${key}`)

            config.plugin('html-' + key).tap(args => {
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = platformResource.cdn.build
                }
                if (process.env.NODE_ENV === 'development') {
                    args[0].cdn = platformResource.cdn.dev
                }
                return args
            })
        })
    }
}

exports.cdn = platformResource.cdn
exports.externals = platformResource.externals
exports.getPages = getPages
exports.handleHtml = handleHtml
