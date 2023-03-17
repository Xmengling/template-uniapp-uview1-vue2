module.exports = {
	devServer:{
		port:'8080',
		open:true,
		proxy:{
			'/dev-api':{
				// target:'http://api.vote.sohord10.h3c.com', // 测试服
				target:'http://api.intcloud.h3c.com',
				changeOrigin:true,
				pathRewrite:{
					'^/dev-api': ''
				}
			}
		}
	}
}