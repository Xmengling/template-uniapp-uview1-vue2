<template>
	<view class="index-wrap">

	</view>
</template>

<script>
	export default {
		name: 'Index',
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.checkToken()
		},
		methods: {
			async checkToken() {
				// 检查token是否过期
				const token = uni.getStorageSync('token')
				if (token) {
					try {
						// await checkTokenApi()
						// token有效，免登
						this.pageToHelloWorld()
					} catch (error) {
						console.error('error', error)
					}
				} else {
					this.pageToLogin()
				}
			},

			// 跳过登录
			pageToLogin() {
				// 走登录逻辑
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
    	},

			pageToHelloWorld() {
				uni.reLaunch({
					url: '/pages/hello-world/hello-world'
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.api-btn {
			width: 50%;
			margin-top: 50rpx;
		}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}
}
</style>
