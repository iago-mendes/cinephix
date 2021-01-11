import {AppProps} from 'next/app'
import {ThemeProvider} from 'styled-components'
import SwiperCore, {Navigation, Pagination} from 'swiper'
import 'swiper/swiper-bundle.css'

import Menu from '../components/Menu'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({Component, pageProps}) =>
{
	SwiperCore.use([Navigation, Pagination])

  return (
    <ThemeProvider theme={theme}>
			<Menu />
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp