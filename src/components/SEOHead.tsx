import Head from 'next/head'
import getConfig from 'next/config'

const {publicRuntimeConfig: env} = getConfig()

interface SEOHeadProps
{
	title?: string
	description?: string
	image?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({title, description, image}) =>
{
	const meta =
	{
		title: title && 'Cinephix | The application made for cinephiles',
		description: description && 'The Cinephix application is a place where people passionate about movies and TV shows can pursue this interest. Here, you can search and discover new content, as well as organize your entertainment medias. For example, you can separate your TV shows by status, add movies to your watch list, rate all your media, and more.',
		image: image && `${env.apiUrl}/assets/thumbnail.png`,
		url: 'https://cinephix.com'
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name='title' content={meta.title} />
			<meta name='description' content={meta.description} />

			<meta property='og:type' content='article' />
			<meta property='og:url' content={meta.url} />
			<meta property='og:title' content={meta.title} />
			<meta property='og:description' content={meta.description} />
			<meta property='og:image' content={meta.image} />
			<meta property='og:site_name' content='Cinephix' />

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content={meta.url} />
			<meta property='twitter:title' content={meta.title} />
			<meta property='twitter:description' content={meta.description} />
			<meta property='twitter:image' content={meta.image} />
		</Head>
	)
}

export default SEOHead