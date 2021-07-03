import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import SwiperCore, {Navigation} from 'swiper'
import 'swiper/swiper-bundle.css'

import Menu from '../components/Menu'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import SessionHandler from '../components/SessionHandler'
import Footer from '../components/Footer'
import * as gtag from '../utils/gtag'
import CookieBanner from '../components/modals/CookieBanner'
import BannerAd from '../components/ads/Banner'
import ModalAd from '../components/ads/Modal'
import {UserStatusProvider} from '../contexts/UserStatus'
import {I18nHandler} from '../components/I18nHandler'
import {AuthProvider} from '../contexts/Auth'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	SwiperCore.use([Navigation])

	const {pathname, events} = useRouter()

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url)
		}

		events.on('routeChangeComplete', handleRouteChange)
		return () => events.off('routeChangeComplete', handleRouteChange)
	}, [events])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

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
