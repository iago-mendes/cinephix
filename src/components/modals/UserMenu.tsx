import {BsFillTriangleFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {signOut} from 'next-auth/client'
import {motion} from 'framer-motion'

import Container from '../../styles/components/modals/UserMenu'
import useUser from '../../hooks/useUser'
import Link from 'next/link'

interface UserMenuProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const UserMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) =>
{
	const {user} = useUser()

	function handleSignOut()
	{
		setIsOpen(false)
		signOut()
	}

	if (!user)
		return null

	return (
		<motion.div
			initial={false}
			transition={{duration: 0.25}}
			animate={isOpen ? 'open' : 'closed'}
			variants=
				{{
					open:
				{
					height: 'fit-content',
					opacity: 1,
				},
					closed:
				{
					height: 0,
					opacity: 0,
				}
				}}
			style=
				{{
					position: 'absolute',
					right: 0,
					top: '5rem',
					zIndex: 100,

					overflow: 'hidden',
					padding: '1rem',
					paddingTop: 0,
				}}
		>
			<Container
				onMouseLeave={() => setIsOpen(false)}
			>
				<div className='detail'>
					<BsFillTriangleFill size={10} />
				</div>
				<main>
					<div className='session'>
						<p>Signed in as <strong>{user.email}</strong></p>
						<button onClick={handleSignOut} >
							<FiLogOut size={20} />
							<span>Sign out</span>
						</button>
					</div>
					<div className='links'>
						<Link href='/user' >
							<a onClick={() => setIsOpen(false)} >
								My profile
							</a>
						</Link>
						<Link href='/user/tvshows'>
							<a onClick={() => setIsOpen(false)} >
								My TV shows
							</a>
						</Link>
						<Link href='/user/movies'>
							<a onClick={() => setIsOpen(false)} >
								My movies
							</a>
						</Link>
					</div>
				</main>
			</Container>
		</motion.div>
	)
}

export default UserMenu