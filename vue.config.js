const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,




    // 加上这一段
  devServer: {
    port: 3000,                // 前端跑在 3000 端口
    proxy: {
      '/api': {                // 拦截所有 /api 开头的请求
        target: 'http://localhost:8080',   // 转给 json-server
        changeOrigin: true,    // 改掉请求头里的 origin，绕过跨域
        pathRewrite: { '^/api': '' }        // 去掉 /api，因为 json-server 路由没有 /api
      }
    }
  }
})
