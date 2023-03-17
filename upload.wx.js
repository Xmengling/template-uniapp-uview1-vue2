// upload.wx.js
const ci = require('miniprogram-ci')
// 从 package.json 中读取 version，description 和 uploadKey
let { version, description: desc, uploadKey } = require('./package.json')
// 读取小程序 appid
let { appid } = require('./conf/project.config.json')

if (!version) version = '1.0.0'
if (!desc) desc = new Date() + '上传'
if (!appid) appid = 'touristid'
if (!uploadKey) uploadKey = `./conf/private.${appid}.key`

// 创建项目对象
const project = new ci.Project({
  appid, // 小程序appid
  type: 'miniProgram', // 类型，小程序或小游戏
  projectPath: './dist/build/mp-weixin', // 项目路径
  privateKeyPath: uploadKey, // 密钥路径
  ignores: ['node_modules/**/*'] // 忽略的文件
})
// 调用上传方法
ci.upload({
  project,
  version,
  desc,
  setting: {
    es6: true, // 是否 "es6 转 es5"
    es7: true,
    minify: true // 是否压缩代码
  }
}).then(res => {
  console.log(res)
  console.log('上传成功')
}).catch(error => {
  if (error.errCode === -1) {
    console.log('上传成功')
  }
  console.log(error)
  console.log('上传失败')
  process.exit(-1)
})
