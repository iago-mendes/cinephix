import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {BsFillTriangleFill} from 'react-icons/bs'
import {signIn} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useState} from 'react'
import {FiMenu} from 'react-icons/fi'

import Container from '../styles/components/Menu'
import logo from '../assets/logo-name.svg'
import useUser from '../hooks/useUser'
import UserMenu from './modals/UserMenu'
import useDimensions from '../hooks/useDimensions'

const Menu: React.FC = () =>
{
	const {user} = useUser()
	const Router = useRouter()
	const {width} = useDimensions()

	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<Container
			isModalOpen={isModalOpen}
		>
			<UserMenu 
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>

			{width <= 600 && (
				<button className='burger' >
					<FiMenu size={30} />
				</button>
			)}

			<img src={logo} alt='Cinephix' className='logo' onClick={() => Router.push('/')} />
			<div className='container'>
				{width > 600 && (
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
				)}
				<div className='user'>
					{
						user
						? (
							<button onClick={() => setIsModalOpen(!isModalOpen)} >
								{
									user.image
									? <img src={user.image} alt={user.name} className='img' />
									: <BiUserCircle size={35} className='img' />
								}
								<BsFillTriangleFill size={10} className='indicator' />
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