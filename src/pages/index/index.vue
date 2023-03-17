<template>
	<view class="index-wrap">
		<u-rate/>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view class="api-btn">
			<u-button type="primary" @click="testApi">api请求</u-button>
		</view>
	</view>
</template>

<script>
	import {apiTest} from '@/api/hello-world'
	export default {
		name: 'Index',
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.checkLogin()
		},
		methods: {
			async testApi() {
				try {
					await apiTest()
				} catch (error) {
					console.error(error)
				}
			},

			// 跳过登录
			checkLogin() {
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
