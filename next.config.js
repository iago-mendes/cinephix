const withImages = require('next-images')

module.exports = withImages({
	esModule: true,
	images:
	{
		domains: [process.env.API_HOSTNAME, process.env.TMDB_IMG_HOSTNAME],
		loader: 'imgix',
		path: ''
	},
	publicRuntimeConfig:
	{
		apiUrl: process.env.API_URL,
		apiKey: process.env.API_KEY
	}
})