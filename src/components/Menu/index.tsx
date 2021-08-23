import Link from 'next/link'
import Image from 'next/image'
import {BiUserCircle} from 'react-icons/bi'
import {BsFillTriangleFill} from 'react-icons/bs'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Trans} from '@lingui/macro'

import Container, {BurgerMenu} from './styles'
import logoName from '../../assets/images/logo/name.svg'
import logoIcon from '../../assets/images/logo/icon.svg'
import {useAuth} from '../../hooks/useAuth'
import UserMenu from '../_modals/UserMenu'
import useDimensions from '../../hooks/useDimensions'
import useClickOutside from '../../hooks/useClickOutside'
import {useUserStatus} from '../../hooks/useUserStatus'
import {useAvoidScroll} from '../../hooks/useAvoidScroll'
import {SkeletonLoading} from '../../utils/skeletonLoading'
import {BurgerButton} from '../BurgerButton'

const Menu: React.FC = () => {
	const {user, signIn, loading} = useAuth()
	const {inMobile, inDesktop} = useDimensions()
	const {pathname} = useRouter()
	const {isTyping} = useUserStatus()

	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
	const userRef = useClickOutside(() => setIsUserMenuOpen(false))

	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
	const burgerRef = useClickOutside(() => setIsBurgerMenuOpen(false))

	useAvoidScroll(isBurgerMenuOpen)

	useEffect(() => {
		setIsBurgerMenuOpen(false)
	}, [pathname])

	if (isTyping && inMobile) return null

	return (
		<Container isUserMenuOpen={isUserMenuOpen}>
			{inMobile && (
				<div className="burger" ref={burgerRef}>
					<BurgerButton
						isOpen={isBurgerMenuOpen}
						setIsOpen={setIsBurgerMenuOpen}
					/>

					<BurgerMenu
						initial={false}
						animate={isBurgerMenuOpen ? 'openned' : 'closed'}
						variants={{
							closed: {marginRight: '100vw'},
							openned: {
								marginRight: '25vw',
								transition: {type: 'spring', stiffness: 250, damping: 15}
							}
						}}
						style={{
							marginBottom: '5rem',
							height: 'calc(100vh - 5rem)'
						}}
					>
						<RouteOptions showAbout />
					</BurgerMenu>
				</div>
			)}

			<Link href="/">
				<div className="logos">
					<div className="icon">
						<Image src={logoIcon} alt="Cinephix" />
					</div>
					{inDesktop && (
						<div className="name">
							<Image src={logoName} alt="Cinephix" />
						</div>
					)}
				</div>
			</Link>

			<div className="container">
				{inDesktop && <RouteOptions />}
				<div className="user" ref={userRef}>
					{loading ? (
						<SkeletonLoading height="3rem" width="5rem" />
					) : user ? (
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
						<button className="signIn" onClick={signIn}>
							<Trans>Sign in</Trans>
						</button>
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
