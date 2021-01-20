import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useState} from 'react'

import Container from '../styles/components/Menu'
import logo from '../assets/logo-name.svg'
import useUser from '../hooks/useUser'
import UserMenu from './modals/UserMenu'

const Menu: React.FC = () =>
{
	const {user} = useUser()
	const Router = useRouter()

	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<Container>
			<UserMenu 
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>

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
						? (
							<button onClick={() => setIsModalOpen(true)} >
								{
									user.image
									? <img src={user.image} alt={user.name} className='img' />
									: <BiUserCircle size={35} className='img' />
								}
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