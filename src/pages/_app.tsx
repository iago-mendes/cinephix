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

const MyApp: React.FC<AppProps> = ({Component, pageProps}) =>
{
	SwiperCore.use([Navigation])

	const {pathname} = useRouter()

	useEffect(() =>
	{
		window.scrollTo(0,0)
	}, [pathname])

	return (
		<ThemeProvider theme={theme}>
			<SessionProvider session={pageProps.session} >
				<Menu />
				<Component {...pageProps} />
				<GlobalStyle />
			</SessionProvider>
		</ThemeProvider>
	)
}

export default MyApp