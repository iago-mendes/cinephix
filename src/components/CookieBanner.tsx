import {useEffect} from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useRouter} from 'next/router'

const MySwal = withReactContent(Swal)

const CookieBanner: React.FC= () =>
{
	const {push, pathname} = useRouter()

	useEffect(() =>
	{
		const cookieConsent = localStorage.getItem('user-has-accepted-cookies')
		if (!cookieConsent && pathname !== '/about/privacy-policy')
			setTimeout(showBanner, 5000)
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

	return null
}

export default CookieBanner