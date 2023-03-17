// 封装uni.request方法
export const request = (options) => {
  const baseUrl = options.baseUrl || 'http://api-meeting.intcloud.h3c.com' // 可以通过环境变量配置
  const token = uni.getStorageSync('token')

  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '加载中'
    })
    uni.request({
      url: baseUrl + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      responseType: options.responseType ? options.responseType : 'text',
      header: {
        'authorization': token
      },
      success: (res) => {
        uni.hideLoading()
        if (res.data.resultCode === 200 || res.data.resultCode === 0) {
          // 成功
          resolve(res)
        } else if (res.data.resultCode === 401) {
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          // token过期 返回登录页
          uni.removeStorageSync('token')
          // #ifdef MP-WEIXIN
          uni.reLaunch({
            url: '/pages/login/login-wechat'
          })
          // #endif
          // #ifdef H5
          uni.reLaunch({
            url: '/pages/login/login-h5'
          })
          // #endif
        } else {
          // 其他异常
          uni.showToast({
            title: res.data.msg,
            icon: 'none',
          })
          reject(error)
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '网络连接异常',
        })
        reject(err)
      }
    })
  })
}
