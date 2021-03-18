import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {FiX} from 'react-icons/fi'
import {motion} from 'framer-motion'

import Container from '../../styles/components/modals/CookieBanner'

const CookieBanner: React.FC = () =>
{
	const {push, pathname} = useRouter()

	const [show, setShow] = useState(false)

	useEffect(() =>
	{
		const cookieConsent = localStorage.getItem('user-has-accepted-cookies')
		if (!cookieConsent && pathname !== '/about/privacy-policy')
			setTimeout(() => setShow(true), 5000)
	}, [pathname])

	function acceptCookies()
	{
		localStorage.setItem('user-has-accepted-cookies', 'true')
		setShow(false)
	}

	function seePrivacyPolicy()
	{
		push('/about/privacy-policy')
	}

	if (!show)
		return null
	
	return (
		<motion.div
			animate={{scale: [0, 1, 0.9, 1], position: 'fixed', right: '1rem', bottom: '1rem', zIndex: 2}}
			transition={{ duration: 0.5 }}
		>
			<Container>
				<button id='close'onClick={acceptCookies} >
					<FiX size={20} />
				</button>
				<div className='message'>
					<h2>Cookies</h2>
					<p>This site uses cookies to provide you a great user experience. By using Cinephix, you accept our policies.</p>
				</div>
				<div className='buttons'>
					<button className='accept' onClick={acceptCookies} >Ok</button>
					<button onClick={seePrivacyPolicy} >See Privacy Policy</button>
				</div>
			</Container>
		</motion.div>
	)
}

export default CookieBanner