<template>
  <view class="login-wrap">
    <u-popup :show="popupShow" mode="bottom" :mask-close-able="false">
      <view class="btn-wrap">
        <u-button
          ref="phone"
          icon="weixin-fill"
          type="primary"
          :open-type="getPhoneNumber"
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
    this.beforeLogin()
  },
  methods: {
    async beforeLogin() {
      // 检查token是否过期
      const token = uni.getStorageSync('token')
      if (token) {
        try {
          await checkTokenApi()
          // token有效，免登
          pageCheck()
        } catch (error) {
          console.error('error', error)
        }
      } else {
        this.popupShow = true
        uni.login({
          provider: 'weixin',
          success: (res) => {
            console.log('res', res)
            this.params.code = res.code
          }
        })
      }
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
      // 获取临时token
      await this.getPhoneApi()
      // 获取组织列表
      // const tenantList = await getGroupsListApi()
      // 获取真实token
      // await this.getRealTokenApi(tenantList)
      // 页面跳转逻辑
      this.popupShow = false
    },

    // 获取真实token
    // async getRealTokenApi(tenantList) {
    //   // 获取groupId
    //   const groupId = getGroupId(tenantList)
    //   // 获取真实token
    //   await getRealToken(groupId)
    // },

    // 微信获取临时token和手机号
    async getPhoneApi() {
      if (!this.params.code || !this.params.phoneCode) {
        uni.showToast({
          title: '微信版本过低，请更新版本',
          icon: 'none'
        })
        throw new Error()
      }
      const res = await this.$request.getPhone({ ...this.params })
      if (Number(res.data.retCode) === 0) {
        uni.setStorageSync('token', res.data.data.token)
        uni.setStorageSync('phone', res.data.data.phoneNumber)
      } else {
        uni.showToast({
          title: res.data.message,
          icon: 'none'
        })
        throw new Error()
      }
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
