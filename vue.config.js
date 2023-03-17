module.exports = {
	transpileDependencies: ['uview-ui'],
	devServer:{
		port:'8080',
		open:true,
		proxy:{
			'/dev-api':{
				target:'http://api.intcloud.h3c.com',
				changeOrigin:true,
				pathRewrite:{
					'^/dev-api': ''
				}
			}
		}
	}
}