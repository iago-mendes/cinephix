import {useRouter} from 'next/router'
import {PropsWithChildren, useEffect, useState} from 'react'
import {FiLogIn} from 'react-icons/fi'

import Container from './styles'
import Loading from '../Loading'
import {useAuth} from '../../hooks/useAuth'
import logo from '../../assets/images/logo/name.svg'

const SessionHandler = ({children}: PropsWithChildren) => {
	const {user, loading, signIn} = useAuth()
	const {pathname} = useRouter()
	const [route, setRoute] = useState('')

	const privateRoutes = ['user', 'groups']

	useEffect(() => {
		const tmpRoute = pathname.split('/')[1]
		setRoute(tmpRoute)
	}, [pathname])

	if (privateRoutes.includes(route)) {
		if (loading) return <Loading style={{height: 'calc(100vh - 5rem)'}} />

		if (!user)
			return (
				<Container>
					<img src={logo} alt="Cinephix" className="logo" />
					<main>
						<div className="message">
							<span>You need to be signed in to access this page.</span>
							<p>It's really easy!</p>
							<p>
								You don't have to create an account with us; all you have to do
								is sign in with your Google account.
							</p>
							<p>Simple just like that!</p>
						</div>
						<button>
							<FiLogIn size={30} />
							<span onClick={signIn}>Sign in</span>
						</button>
					</main>
				</Container>
			)
	}

	return <>{children}</>
}

export default SessionHandler
