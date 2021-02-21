import Link from 'next/link'
import {motion} from 'framer-motion'
import {useRouter} from 'next/router'
import {useEffect} from 'react'

import Container from '../../styles/components/modals/BurgerMenu'
import useClickOutside from '../../hooks/useClickOutside'

interface UserMenuProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const BurgerMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) =>
{
	const {pathname} = useRouter()
	const ref = useClickOutside(() => setIsOpen(false))

	useEffect(() =>
	{
		setIsOpen(false)
	}, [pathname])

	return (
		<motion.div
			initial={false}
			transition={{duration: 0.25}}
			animate={isOpen ? 'open' : 'closed'}
			variants=
				{{
					open:
					{
						width: 'fit-content',
						opacity: 1,
						overflowY: 'auto'
					},
					closed:
					{
						width: 0,
						opacity: 0,
						overflowY: 'hidden'
					}
				}}
			style=
				{{
					position: 'fixed',
					top: '5rem',
					left: 0,
					zIndex: 100,

					height: 'calc(100vh - 5rem)',
					overflowX: 'hidden',
					boxShadow: '5px 5px 5px rgba(0,0, 0, 0.5)'
				}}
		>
			<Container
				ref={ref}
			>
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
			</Container>
		</motion.div>
	)
}

export default BurgerMenu