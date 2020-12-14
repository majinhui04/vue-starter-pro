const LocalConfig = require('./config.js')
const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem') // @H5 将 px 转成 rem
const CompressionPlugin = require('compression-webpack-plugin')
const _ = require('lodash')
const { join } = require('path')
const { handleHtml, getPages, externals } = require('./build/utils')
const env = process.env
const isDev = env.VUE_APP_ENV === 'dev'
const isSPA = LocalConfig.mode === 'SPA'
const isH5 = LocalConfig.platform === 'h5'
const pages = getPages()
const entry = isSPA ? {} : { pages }
console.log('isSPA', isSPA)
console.log('isH5', isH5)
console.log('entry', entry)
console.log('VUE_APP_ENV', env.VUE_APP_ENV)
console.log('VUE_APP_BASEURL_API', env.VUE_APP_BASEURL_API)
/* 当代理的前缀为空时 */
if (isDev) {
    const isEmpty = prefix => prefix === '' || prefix === '/'
    if (isEmpty(env.VUE_APP_BASEURL_API)) env.VUE_APP_BASEURL_API = '/@API'
}
console.log('env.DEV_PROXY_TARGET_API', env.DEV_PROXY_TARGET_API)
/**
 * @type {import('@vue/cli-service').ConfigFunction}
 */
module.exports = () => ({
    ...entry,
    outputDir: env.outputDir || 'dist',
    lintOnSave: false, //是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    devServer: {
        host: '0.0.0.0',
        /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
        proxy: {
            [env.VUE_APP_BASEURL_API]: {
                changeOrigin: true,
                pathRewrite: { '^/@API': '' },
                target: env.DEV_PROXY_TARGET_API,
            },
        },
    },

    assetsDir: 'static-hash',

    publicPath: env.BASE_URL,

    css: {
        extract: false,
        loaderOptions: {
            less: {
                globalVars: {
                    hack: `true; @import '${join(
                        __dirname,
                        './src/styles/vars.less',
                    )}'`,
                },
            },
            postcss: {
                plugins: function({ resourcePath: path }) {
                    const pxtorem = postcssPxtorem({ propList: ['*'] }) // @H5 将 px 转成 rem
                    // if (
                    //     /* 跳过 autoprefixer */
                    //     /[\\/]node_modules[\\/].+\.css$/.test(path) ||
                    //     /[\\/]src[\\/]libs[\\/].+\.css$/.test(path) ||
                    //     (isDev && env.DEV_CSS_AUTOPREFIXER !== 'true')
                    // ) {
                    //     return [pxtorem]
                    // }
                    if (isH5) {
                        return [pxtorem, autoprefixer]
                    }
                    // return [pxtorem, autoprefixer]
                    // if (isDev && env.DEV_CSS_AUTOPREFIXER !== 'true') {
                    //     return []
                    // }
                    return [autoprefixer]
                },
            },
        },
        sourceMap: isDev ? env.DEV_CSS_SOURCEMAP === 'true' : false,
    },

    productionSourceMap: env.VUE_APP_ENV === 'stage',

    configureWebpack: config => {
        if (isDev) config.devtool = 'source-map'
        // 不打包固定的第三方依赖
        Object.assign(config, {
            externals: externals,
        })

        // config.optimization.splitChunks.cacheGroups.vendors.test = module => {
        //     const { resource: path } = module
        //     if (!path) return false
        //     if (
        //         /* 为了 chunk-vendors*.js 的稳定性，需要排除掉经过 babel 插件处理成按需引入的模块（详见 babel.config.js） */
        //         /[\\/]node_modules[\\/]element-ui[\\/]/.test(path) || // @PC.element-ui
        //         /[\\/]node_modules[\\/]vant[\\/]/.test(path) || // @H5.vant
        //         /[\\/]node_modules[\\/]lodash[\\/]/.test(path)
        //     ) {
        //         return false
        //     }
        //     return /[\\/]node_modules[\\/]|[\\/]src[\\/]libs[\\/]/.test(path) // 将这些初始化时的依赖包纳入 chunk-vendors*.js（其它的则纳入 app*.js）
        // }
    },

    chainWebpack: config => {
        // 多页面处理
        if (isSPA) {
            handleHtml(config, null)
        } else {
            handleHtml(config, pages)
        }

        /* 跳过 babel-loader */
        config.module.rule('js').exclude.add(path => {
            return /[\\/]src[\\/]libs[\\/].+\.js$/.test(path)
        })

        const svgSpriteIconsDir = join(
            __dirname,
            './src/components/SvgIcon/icons/',
        )
        config.module.rule('svg').exclude.add(svgSpriteIconsDir)
        config.module
            .rule('svg-sprite')
            .after('svg')
            .test(/\.(svg)(\?.*)?$/)
            .include.add(svgSpriteIconsDir)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: '$svgSpriteIcon_[name]' })
            .end()
            .use('svgo-loader')
            .loader('svgo-loader')

        // /* @H5.vant */
        const vant = config.module
            .rule('less')
            .oneOf('vant')
            .before('vue-modules')
            .test(/[\\/]node_modules[\\/]vant[\\/]/)
        config.module
            .rule('less')
            .oneOf('normal')
            .toConfig()
            .use.forEach(({ __useName, loader, options = {} }) => {
                const ops = _.cloneDeep(options)
                if (__useName === 'less-loader') {
                    delete ops.globalVars
                    ops.modifyVars = {
                        hack: `true; @import '${join(
                            __dirname,
                            './src/vant/vars.less',
                        )}'`,
                    }
                }
                vant.use(__useName)
                    .loader(loader)
                    .options(ops)
            })

        // if (config.plugins.has('copy')) {
        //     config.plugin('copy').tap(args => {
        //         args[0][0].ignore.push('.eslintrc.js', '.prettierrc.js')
        //         args[0][0].transform = function(content, path) {
        //             if (
        //                 /* 让 public 中的其它文件也支持 EJS 语法（传入运行时可用的环境变量） */
        //                 /\.(html|htm|js|json)$/.test(path) &&
        //                 /[\\/]public[\\/]libs[\\/]/.test(path) === false
        //             ) {
        //                 const options = {
        //                     interpolate: /<%=([\s\S]+?)%>/g,
        //                     sourceURL: path,
        //                 }
        //                 const obj = _.pickBy(env, (val, key) =>
        //                     /^(NODE_ENV|BASE_URL|VUE_APP_.*)$/.test(key),
        //                 )
        //                 content = _.template(`${content}`, options)(obj)
        //             }
        //             return content
        //         }
        //         return args
        //     })
        // }

        if (process.env.VUE_APP_GZIP === 'true') {
            const productionGzipExtensions = ['js', 'css']
            config.plugin('compressionPlugin').use(
                new CompressionPlugin({
                    filename: '[path][base].gz', // 注意: compress版本不同配置不同
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$',
                    ),
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            )
        }
    },
})

if (env.NODE_ENV) {
    if (
        /^(development|production|test)$/.test(env.NODE_ENV) === false ||
        /^(dev|stage|prod|test)$/.test(env.VUE_APP_ENV) === false ||
        (env.NODE_ENV === 'development' && env.VUE_APP_ENV !== 'dev') ||
        (env.NODE_ENV === 'production' && env.VUE_APP_ENV === 'dev') ||
        (env.NODE_ENV === 'production' && env.VUE_APP_MOCK === undefined)
    ) {
        throw new Error('环境变量配置错误或不兼容或缺失')
    }
}
