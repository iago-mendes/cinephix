import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {BsFillTriangleFill} from 'react-icons/bs'
import {signIn} from 'next-auth/client'
import {useEffect, useState} from 'react'
import {FiMenu, FiX} from 'react-icons/fi'
import {useRouter} from 'next/router'

import Container, {BurgerMenu} from '../styles/components/Menu'
import logoName from '../assets/logo/name.svg'
import logoIcon from '../assets/logo/icon.svg'
import useUser from '../hooks/useUser'
import UserMenu from './modals/UserMenu'
import useDimensions from '../hooks/useDimensions'
import useClickOutside from '../hooks/useClickOutside'
import {useUserStatus} from '../contexts/UserStatus'

const Menu: React.FC = () => {
	const {user} = useUser()
	const {inMobile, inDesktop} = useDimensions()
	const {pathname} = useRouter()
	const {isTyping} = useUserStatus()

	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const userRef = useClickOutside(() => setIsUserMenuOpen(false))

	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
	const burgerRef = useClickOutside(() => setIsBurgerMenuOpen(false))

	useEffect(() => {
		setIsBurgerMenuOpen(false)
	}, [pathname])

	if (isTyping && inMobile) return null

	return (
		<Container isUserMenuOpen={isUserMenuOpen}>
			{inMobile && (
				<div className="burger">
					<button
						className="controller"
						onClick={() => setIsBurgerMenuOpen(true)}
					>
						<FiMenu />
					</button>

					<BurgerMenu isOpen={isBurgerMenuOpen} ref={burgerRef}>
						<button
							className="controller"
							onClick={() => setIsBurgerMenuOpen(false)}
						>
							<FiX />
						</button>

						<RouteOptions showAbout />
					</BurgerMenu>
				</div>
			)}

			<Link href="/">
				<div className="logos">
					<img src={logoIcon} className="icon" />
					{inDesktop && <img src={logoName} className="name" />}
				</div>
			</Link>

			<div className="container">
				{inDesktop && <RouteOptions />}
				<div className="user" ref={userRef}>
					{user ? (
						<button
							className="dropdown"
							onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
						>
							{user.image ? (
								<img src={user.image} alt={user.name} className="img" />
							) : (
								<BiUserCircle size={35} className="img" />
							)}
							<BsFillTriangleFill size={10} className="indicator" />
						</button>
					) : (
						<span className="signIn" onClick={() => signIn('google')}>
							Sign in
						</span>
					)}
					<UserMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} />
				</div>
			</div>
		</Container>
	)
}

const RouteOptions: React.FC<{showAbout?: boolean}> = ({showAbout = false}) => {
	return (
		<div className="links">
			<Link href="/">Home</Link>
			<Link href="/movies">Movies</Link>
			<Link href="/tvshows">TV shows</Link>
			<Link href="/celebrities">Celebrities</Link>
			<Link href="/events">Events</Link>
			{showAbout && <Link href="/about">About</Link>}
		</div>
	)
}

export default Menu
