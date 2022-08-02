module.exports = {
	devServer:{
		port:'8080',
		open:true,
		proxy:{
			'/dev-api':{
				// target:'http://api.vote.sohord10.h3c.com', // 测试服
				target:'http://api.intcloud.h3c.com',
				// target:'http://10.214.20.87:9201', // 后端本地
				// target:'http://localhost:9201',
				changeOrigin:true,
				pathRewrite:{
					'^/dev-api': ''
				}
			}
		}
	}
}