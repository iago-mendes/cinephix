import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Menu from '../components/Menu'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import SessionHandler from '../components/SessionHandler'
import Footer from '../components/Footer'
import * as gtag from '../utils/gtag'
import CookieBanner from '../components/_modals/CookieBanner'
import BannerAd from '../components/_ads/Banner'
import ModalAd from '../components/_ads/Modal'
import {UserStatusProvider} from '../contexts/UserStatus'
import {I18nHandler} from '../locales/I18nHandler'
import {AuthProvider} from '../contexts/Auth'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	const {events} = useRouter()

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url)
		}

		events.on('routeChangeComplete', handleRouteChange)
		return () => events.off('routeChangeComplete', handleRouteChange)
	}, [events])

	return (
		<ThemeProvider theme={theme}>
			<I18nHandler>
				<CookieBanner />
				<BannerAd />
				<ModalAd />
				<AuthProvider>
					<UserStatusProvider>
						<Menu />
						<SessionHandler>
							<Component {...pageProps} />
						</SessionHandler>
						<Footer />
						<GlobalStyle />
					</UserStatusProvider>
				</AuthProvider>
			</I18nHandler>
		</ThemeProvider>
	)
}

export default MyApp
