import Link from 'next/link'
import Banner from 'react-cookie-banner'

const CookieBanner: React.FC = () =>
{
	return (
		<Banner
			message='This site uses cookies to provide you with a great user experience. By using Cinephix, you accept our policies.'
			cookie='user-has-accepted-cookies'
			buttonMessage='Ok'
			link={(
				<Link href='/about/privacy-policy' >
					Privacy Policy
				</Link>
			)}
		/>
	)
}

export default CookieBanner