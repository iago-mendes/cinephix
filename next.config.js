const withImages = require('next-images')

module.exports = withImages({
	esModule: true,
	images:
	{
		// domains: [process.env.API_HOSTNAME],
		loader: 'imgix',
		path: ''
	},
	publicRuntimeConfig:
	{
		
	}
})