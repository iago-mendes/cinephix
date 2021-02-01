import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {BsFillTriangleFill} from 'react-icons/bs'
import {signIn} from 'next-auth/client'
import {useState} from 'react'
import {FiMenu} from 'react-icons/fi'
import Image from 'next/image'

import Container from '../styles/components/Menu'
import logoName from '../assets/logo/name.svg'
import logoIcon from '../assets/logo/icon.svg'
import useUser from '../hooks/useUser'
import UserMenu from './modals/UserMenu'
import useDimensions from '../hooks/useDimensions'
import BurgerMenu from './modals/BurgerMenu'

const Menu: React.FC = () =>
{
	const {user} = useUser()
	const {width} = useDimensions()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)

	return (
		<Container
			isModalOpen={isModalOpen}
		>
			<UserMenu 
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
			/>

			<BurgerMenu
				isOpen={isBurgerMenuOpen}
				setIsOpen={setIsBurgerMenuOpen}
			/>

			{width <= 600 && (
				<button className='burger' onClick={() => setIsBurgerMenuOpen(true)}>
					<FiMenu size={30} />
				</button>
			)}

			<Link href='/'>
				<div className='logos'>
					<div className='icon'>
						<Image src={logoIcon} width={1000} height={1000} layout='responsive' />
					</div>
					<div className='name'>
						<Image src={logoName} width={1000} height={200} layout='responsive' />
					</div>
				</div>
			</Link>
			
			<div className='container'>
				{width > 600 && (
					<div className='links'>
						<Link href='/' >
							Home
						</Link>
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