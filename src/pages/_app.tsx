import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import SwiperCore, {Navigation} from 'swiper'
import 'swiper/swiper-bundle.css'
import {Provider as SessionProvider} from 'next-auth/client'

import Menu from '../components/Menu'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import SessionHandler from '../components/SessionHandler'
import Footer from '../components/Footer'
import * as gtag from '../utils/gtag'
import CookieBanner from '../components/modals/CookieBanner'
import BannerAd from '../components/ads/Banner'
import ModalAd from '../components/ads/Modal'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) =>
{
	SwiperCore.use([Navigation])

	const {pathname, events} = useRouter()

	useEffect(() =>
	{
		const handleRouteChange = (url: URL) =>
		{
			gtag.pageview(url)
		}
		
		events.on('routeChangeComplete', handleRouteChange)
		return () => events.off('routeChangeComplete', handleRouteChange)
	}, [events])

	useEffect(() =>
	{
		window.scrollTo(0,0)
	}, [pathname])

	return (
		<ThemeProvider theme={theme}>
			<CookieBanner />
			<BannerAd />
			<ModalAd />
			<SessionProvider session={pageProps.session} >
				<Menu />
				<SessionHandler>
					<Component {...pageProps} />
				</SessionHandler>
				<Footer />
				<GlobalStyle />
			</SessionProvider>
		</ThemeProvider>
	)
}

export default MyApp