import React from 'react'
import Document, {
	DocumentInitialProps,
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript
} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

import {analyticsId} from '../utils/gtag'

export default class MyDocument extends Document {
	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				})

			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			}
		} finally {
			sheet.seal()
		}
	}

	render(): JSX.Element {
		const pwa = {
			name: 'Cinephix',
			description:
				'The Cinephix application is a place where people passionate about movies and TV shows can pursue their interest. Here, you can search and discover new content, as well as organize your entertainment media. For example, you can separate your TV shows by status, add movies to your watch list, rate all your media, and more.'
		}

		return (
			<Html lang="en">
				<Head>
					<link rel="icon" href="/favicon.svg" />
					<link
						href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&family=Ubuntu:wght@400;700"
						rel="stylesheet"
					/>

					<meta charSet="utf-8" />
					<meta name="robots" content="index, follow" />

					{/* Global site tag (gtag.js) - Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${analyticsId}', {
								page_path: window.location.pathname,
							});
					`
						}}
					/>

					{/* Google AdSense */}
					<script
						async
						src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
					/>

					{/* PWA */}
					<meta name="application-name" content={pwa.name} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content={pwa.name} />
					<meta name="description" content={pwa.description} />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="theme-color" content="#161C50" />

					<link rel="apple-touch-icon" sizes="64x64" href="/favicon.svg" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
