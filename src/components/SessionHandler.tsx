import {useRouter} from 'next/router'
import {useEffect, useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import {signIn} from 'next-auth/client';

import Container from '../styles/components/SessionHandler'
import Loading from './Loading'
import useUser from '../hooks/useUser';
import logo from '../assets/logo-name-shadow.svg'

const SessionHandler: React.FC = ({children}) =>
{
	const {user, loading} = useUser()
	const {pathname} = useRouter()
	const [route, setRoute] = useState('')

	const privateRoutes = ['user']

	useEffect(() =>
	{
		const tmpRoute = pathname.split('/')[1]
		setRoute(tmpRoute)
	}, [pathname])


	if (privateRoutes.includes(route))
	{
		if (loading)
			return <Loading />

		if (!user)
			return (
				<Container>
					<img src={logo} alt='Cinephix' className='logo' />
					<main>
						<div className="message">
							<span>To access this page, you need to be signed in.</span>
							<p>
								It's really easy! You don't have to create an account with us; all you have to do is sign in with your Google account. Simple just like that!
							</p>
						</div>
						<button>
							<FiLogIn size={30} />
							<span onClick={() => signIn('google')} >Sign in</span>
						</button>
					</main>
				</Container>
			)
	}

	return (
		<>
			{children}
		</>
	)
}

export default SessionHandler