const withPWA = require('next-pwa')

module.exports = withPWA({
	esModule: true,
	images:
	{
		domains: [
			process.env.NEXT_PUBLIC_API_HOSTNAME,
			process.env.NEXT_PUBLIC_TMDB_IMG_HOSTNAME,
			'lh3.googleusercontent.com'
		]
	},
	pwa:
	{
		dest: 'public',
		disable: process.env.NODE_ENV === 'development'
	},
	i18n:
	{
    locales: ['en-US', 'pt-BR'],
    defaultLocale: 'en-US'
  }
})
