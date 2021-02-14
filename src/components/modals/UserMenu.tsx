import {BsFillTriangleFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {signOut} from 'next-auth/client'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Link from 'next/link'

import Container from '../../styles/components/modals/UserMenu'
import useUser from '../../hooks/useUser'

interface UserMenuProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const UserMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) =>
{
	const {user} = useUser()
	const {pathname} = useRouter()

	useEffect(() =>
	{
		setIsOpen(false)
	}, [pathname])

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
					top: '3.5rem',
					zIndex: 100,

					overflow: 'hidden',
					padding: '1rem',
					paddingTop: 0,
				}}
		>
			<Container>
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
					<div className='userLinks'>
						<Link href='/user' >
							My profile
						</Link>
						<Link href='/user/tvshows'>
							My TV shows
						</Link>
						<Link href='/user/movies'>
							My movies
						</Link>
					</div>
				</main>
			</Container>
		</motion.div>
	)
}

export default UserMenu