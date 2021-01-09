import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {signIn, useSession} from 'next-auth/client'
import {useEffect} from 'react'

import Container from '../styles/components/Menu'
import logo from '../assets/logo-name.svg'

const Menu: React.FC = () =>
{
	const [session, loading] = useSession()

	useEffect(() => console.log('[session]', session), [session])

	return (
		<Container>
			<img src={logo} alt='Cinephix' className='logo' />
			<div className='container'>
				<div className='links'>
					<Link href='/movies' >
						Movies
					</Link>
					<Link href='/tvshows' >
						TV shows
					</Link>
					<Link href='/celebrities' >
						Celebrities
					</Link>				
				</div>
				<div className='user'>
					<span onClick={() => signIn('google')} >Sign in</span>
					<button>
						<BiUserCircle size={35} />
					</button>
				</div>
			</div>
		</Container>
	)
}

export default Menu