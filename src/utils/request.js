// 封装uni.request方法 => 业务请求
export const myRequest = (options) => {
  const baseUrl = options.baseUrl || env.BASE_URL
  const token = uni.getStorageSync('token')
  // mock数据使用
  let resUrl = resUrl
  resUrl = baseUrl + options.url

  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '加载中'
    })
    // 登录需连续调多个接口，loading会出现闪烁情况，所以登录接口延迟关闭loading
    let delayTime = 0
    const loginUrl = 'auth/login'
    const userInfoUrl = 'tenant/user'
    const groupListUrl = 'tenant/tenant/outsiders/list'
    if (options.url.startsWith(loginUrl) || options.url.startsWith(userInfoUrl) || options.url.startsWith(groupListUrl)) {
      delayTime = 500
    }
    uni.request({
      url: resUrl,
      method: options.method || 'GET',
      data: options.data || {},
      responseType: options.responseType ? options.responseType : 'text',
      header: {
        'authorization': token
      },
      success: (res) => {
        setTimeout(() => {
          uni.hideLoading()
        }, delayTime)
        // 获取当前路由地址
        /* eslint-disable */
        const current = getCurrentPages()
        /* eslint-enable */
        if (res.data.resultCode === 200 || res.data.resultCode === 0) {
          resolve(res)
        } else if (res.data.resultCode === 401) {
          // token无效
          const currentPage = current[current.length - 1].route
          if (currentPage === 'pages/meetingDetail/meetingDetail') {
            uni.setStorageSync('pages', current[current.length - 1].$page.fullPath)
          }
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
          // 其他报错
          const error = res.data.msg || res.data.message || '请求报错'
          setTimeout(() => {
            uni.showToast({
              title: error,
              icon: 'none',
              duration: 3000
            })
          }, delayTime)
          reject(error)
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '网络连接异常',
          icon: 'error',
          duration: 3000
        })
        reject(err)
        console.error('err', err)
      }
    })
  })
}
