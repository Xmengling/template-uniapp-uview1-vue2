<template>
  <view class="login-wrap">
    <u-popup :show="popupShow" mode="bottom" :mask-close-able="false">
      <view class="btn-wrap">
        <u-button
          ref="phone"
          icon="weixin-fill"
          type="primary"
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          微信用户快速登录
        </u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      popupShow: false,
      params: {
        code: '',
        phoneCode: '',
        appId: 'wx4abc095c04c0666f'
      },
    }
  },
  onLoad() {
    this.wxLogin()
  },
  methods: {
    wxLogin() {
      this.popupShow = true
      uni.login({
        provider: 'weixin',
        success: (res) => {
          console.log('res', res)
          this.params.code = res.code
        }
      })
    },
    // 获取手机号码
    async getPhoneNumber(e) {
      console.log('e', e)
      // 拒绝授权
      if (e.detail.errMsg !== 'getPhoneNumber:ok') {
        uni.showToast({
          title: '授权失败',
          icon: 'none'
        })
        return
      }
      // 允许授权
      this.params.phoneCode = e.detail.code
      this.popupShow = false
      // 调接口进行其他登录操作
      // --------------------------
      uni.setStorageSync('token', 'XXX')
      // 页面跳转
      this.pageToHelloWorld()
    },
    pageToHelloWorld() {
      uni.redirectTo({
        url: '/pages/hello-world/hello-world'
      })
    }
  }
}
</script>

<style lang="scss">
.login-wrap {
  .btn-wrap {
    margin: 100rpx;
  }
}
</style>
