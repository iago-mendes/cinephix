import Link from 'next/link'
import {BiUserCircle} from 'react-icons/bi'
import {BsFillTriangleFill} from 'react-icons/bs'
import {useEffect, useState} from 'react'
import {FiMenu, FiX} from 'react-icons/fi'
import {useRouter} from 'next/router'
import {Trans} from '@lingui/macro'

import Container, {BurgerMenu} from '../styles/components/Menu'
import logoName from '../assets/images/logo/name.svg'
import logoIcon from '../assets/images/logo/icon.svg'
import {useAuth} from '../hooks/useAuth'
import UserMenu from './modals/UserMenu'
import useDimensions from '../hooks/useDimensions'
import useClickOutside from '../hooks/useClickOutside'
import {useUserStatus} from '../contexts/UserStatus'

const Menu: React.FC = () => {
	const {user, signIn} = useAuth()
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
						<span className="signIn" onClick={signIn}>
							<Trans>Sign in</Trans>
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
			<Trans>
				<Link href="/">Home</Link>
			</Trans>
			<Trans>
				<Link href="/movies">Movies</Link>
			</Trans>
			<Trans>
				<Link href="/tvshows">TV shows</Link>
			</Trans>
			<Trans>
				<Link href="/celebrities">Celebrities</Link>
			</Trans>
			<Trans>
				<Link href="/events">Events</Link>
			</Trans>
			{showAbout && (
				<Trans>
					<Link href="/about">About</Link>
				</Trans>
			)}
		</div>
	)
}

export default Menu
