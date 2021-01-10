import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router'

import Container from '../styles/components/Menu'
import logo from '../assets/logo-name.svg'
import useUser from '../hooks/useUser'

const Menu: React.FC = () =>
{
	const {user} = useUser()
	const Router = useRouter()

	return (
		<Container>
			<img src={logo} alt='Cinephix' className='logo' onClick={() => Router.push('/')} />
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
					{
						user
						? user.image
							? (
								<img src={user.image} alt={user.name} />
							)
							: (
								<button>
									<BiUserCircle size={35} />
								</button>
							)
						: (
							<span onClick={() => signIn('google')} >
								Sign in
							</span>
						)
					}
				</div>
			</div>
		</Container>
	)
}

export default Menu