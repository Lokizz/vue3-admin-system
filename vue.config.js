const {
  defineConfig
} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
const path = require('path')
// ? 处理路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  // ? webpack 的 devServer 功能提供代理功能，将所有发送的请求，转发到另一个服务器上
  devServer: {
    proxy: {
      // ? 触发机制：当地址包含 /api 的时候触发
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club',
        // 设置跨域
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        // targets to transform
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // global imports to register
        imports: [
          // presets
          'vue',
          'vue-router',
          'vuex'
        ],
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        // ? 设置 element-plus 的按需导入
        resolvers: [ElementPlusResolver()],
        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: './auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
