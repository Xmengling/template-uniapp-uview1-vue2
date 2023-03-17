<template>
	<view class="hello-world-wrap">
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
		name: 'HelloWorld',
		data() {
			return {
				title: 'HelloWorld'
			}
		},
		onLoad() {},
		methods: {
			async testApi() {
				try {
					await apiTest()
				} catch (error) {
					console.error(error)
				}
			}
		}
	}
</script>

<style lang="scss">
	.hello-world-wrap {
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
