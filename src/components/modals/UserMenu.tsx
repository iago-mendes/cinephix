import {BsFillTriangleFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Link from 'next/link'
import {Trans} from '@lingui/macro'

import Container from '../../styles/components/modals/UserMenu'
import useUser from '../../hooks/useUser'
import useDimensions from '../../hooks/useDimensions'

interface UserMenuProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const UserMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) => {
	const {user, signOut} = useUser()
	const {pathname} = useRouter()
	const {inMobile, inDesktop} = useDimensions()

	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	function handleSignOut() {
		setIsOpen(false)
		signOut()
	}

	if (!user) return null

	return (
		<motion.div
			initial={false}
			transition={{duration: 0.25}}
			animate={isOpen ? 'open' : 'closed'}
			variants={{
				open: {
					height: 'fit-content',
					width: 'fit-content',
					opacity: 1
				},
				closed: {
					height: 0,
					width: 0,
					opacity: 0
				}
			}}
			style={{
				position: 'absolute',
				right: 0,
				top: inMobile ? 'unset' : '3.5rem',
				bottom: inMobile ? '3.5rem' : 'unset',
				zIndex: 100,

				overflow: 'hidden',
				direction: 'rtl',
				padding: '1rem',
				paddingTop: inMobile ? '1rem' : 0,
				paddingBottom: inMobile ? 0 : '1rem'
			}}
		>
			<Container>
				{inDesktop && (
					<div className="detail">
						<BsFillTriangleFill size={10} />
					</div>
				)}

				<main>
					<div className="session">
						<p>
							<Trans>Signed in as</Trans> <strong>{user.email}</strong>
						</p>
						<button onClick={handleSignOut}>
							<FiLogOut size={20} />
							<span>
								<Trans>Sign out</Trans>
							</span>
						</button>
					</div>
					<div className="userLinks">
						<Trans>
							<Link href="/user">My profile</Link>
						</Trans>
						<Trans>
							<Link href="/groups">My groups</Link>
						</Trans>
						<Trans>
							<Link href="/user/tvshows">My TV shows</Link>
						</Trans>
						<Trans>
							<Link href="/user/movies">My movies</Link>
						</Trans>
					</div>
				</main>

				{inMobile && (
					<div className="detail">
						<BsFillTriangleFill size={10} />
					</div>
				)}
			</Container>
		</motion.div>
	)
}

export default UserMenu
