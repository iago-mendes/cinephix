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
		apiKey: process.env.API_KEY,
		analyticsId: process.env.GA_TRACKING_ID
	},
	serverRuntimeConfig:
	{
		authSecret: process.env.AUTH_SECRET,
		googleClientId: process.env.GOOGLE_CLIENT_ID,
		googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
	}
})