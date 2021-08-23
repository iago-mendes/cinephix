import {AppProps} from 'next/app'
import {ThemeProvider} from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Menu from '../components/Menu'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import SessionHandler from '../components/SessionHandler'
import Footer from '../components/Footer'
import CookieBanner from '../components/_modals/CookieBanner'
import BannerAd from '../components/_ads/Banner'
import ModalAd from '../components/_ads/Modal'
import {UserStatusProvider} from '../contexts/userStatus'
import {I18nHandler} from '../locales/I18nHandler'
import {AuthProvider} from '../contexts/auth'
import {DimensionsProvider} from '../contexts/dimensions'
import {useAnalytics} from '../hooks/useAnalytics'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) => {
	useAnalytics()

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<AuthProvider>
				<DimensionsProvider>
					<UserStatusProvider>
						<I18nHandler>
							<CookieBanner />
							<BannerAd />
							<ModalAd />
							<>
								<Menu />
								<SessionHandler>
									<Component {...pageProps} />
								</SessionHandler>
								<Footer />
							</>
						</I18nHandler>
					</UserStatusProvider>
				</DimensionsProvider>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default MyApp
