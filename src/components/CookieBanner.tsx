import Link from 'next/link'
import {CSSProperties} from 'react'
import Banner from 'react-cookie-banner'

import useDimensions from '../hooks/useDimensions'

const CookieBanner: React.FC = () =>
{
	const {width} = useDimensions()

	const bannerDesktopStyle: CSSProperties =
	{
		position: 'fixed',
		bottom: '2rem',
		right: '2rem',

		width: '50vw',
		height: '20vh',
		padding: '1rem',

		backgroundColor: '#26070B',
		boxShadow: '0px 0px 5px #000',
		borderRadius: '1rem',

		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		flexDirection: 'column',
	}

	const bannerMobileStyle: CSSProperties =
	{
		position: 'fixed',
		bottom: '2rem',
		right: '2rem',

		width: 'calc(100vw - 4rem)',
		height: '20vh',
		padding: '1rem',

		backgroundColor: '#26070B',
		boxShadow: '0px 0px 5px #000',
		borderRadius: '1rem',

		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		flexDirection: 'column',
	}

	return (
		<Banner
			message='This site uses cookies to provide you with a great user experience. By using Cinephix, you accept our policies. '
			cookie='user-has-accepted-cookies'
			buttonMessage='Ok'
			link={(
				<Link href='/about/privacy-policy' >
					<a style={{color: '#7B7B7B'}} >
						Privacy Policy
					</a>
				</Link>
			)}
			className='cookie-banner'
			styles={{
				banner: width <= 700 ? bannerMobileStyle : bannerDesktopStyle,
				message:
				{
					fontFamily: 'Ubuntu',
					fontWeight: 700,
					fontSize: '1.75rem',
					lineHeight: '2rem',
					color: '#FF8A00',

					width: '100%',
					textAlign: 'left',
				},
				button:
				{
					position: 'static',
					backgroundColor: '#FF8A00',
					color: '#26070B',

					borderRadius: '1rem',

					fontFamily: 'Ubuntu',
					fontWeight: 700,
					fontSize: '1.75rem',
				}
			}}
		/>
	)
}

export default CookieBanner