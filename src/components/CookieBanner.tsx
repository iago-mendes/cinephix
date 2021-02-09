import {useEffect, useState} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useRouter} from 'next/router'

import Container from '../styles/components/CookieBanner'
import { FiX } from 'react-icons/fi'

const MySwal = withReactContent(Swal)

const CookieBanner: React.FC = () =>
{
	const {push, pathname} = useRouter()

	const [show, setShow] = useState(true)

	useEffect(() =>
	{
		const cookieConsent = localStorage.getItem('user-has-accepted-cookies')
		if (!cookieConsent && pathname !== '/about/privacy-policy')
			setTimeout(() => setShow(true), 5000)
	}, [pathname])

	function showBanner()
	{
		MySwal.fire(
			{
				icon: 'info',
				title: 'Cookies',
				text: 'This site uses cookies to provide you with a great user experience. By using Cinephix, you accept our policies.',
				showCancelButton: true,
				cancelButtonText: 'See Privacy Policy'
			})
			.then(res =>
			{
				if (res.isConfirmed)
					localStorage.setItem('user-has-accepted-cookies', 'true')
				else if (res.isDismissed)
					push('/about/privacy-policy')
			})
	}

	if (!show)
		return null
	
	return (
		<Container>
			<button id="close">
				<FiX size={20} />
			</button>
			<div className='message'>
				<h2>Cookies</h2>
				<p>This site uses cookies to provide you with a great user experience. By using Cinephix, you accept our policies.</p>
			</div>
			<div className='buttons'>
				<button className='accept'>Ok</button>
				<button>See Privacy Policy</button>
			</div>
		</Container>
	)
}

export default CookieBanner