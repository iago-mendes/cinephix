import Modal from 'react-modal'
import {FiX} from 'react-icons/fi'
import Link from 'next/link'

import Container, {modalStyle} from '../../styles/components/modals/BurgerMenu'

Modal.setAppElement('#__next')

interface UserMenuProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const BurgerMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) =>
{
	function close()
	{
		setIsOpen(false)
	}

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container
				onMouseLeave={close}
			>
				<header>
					<button className='close' onClick={close} >
						<FiX size={30} />
					</button>
				</header>
				<nav>
					<Link href='/' >
						<a onClick={close}>
							Home
						</a>
					</Link>
					<Link href='/movies' >
						<a onClick={close}>
							Movies
						</a>
					</Link>
					<Link href='/tvshows' >
						<a onClick={close}>
							TV shows
						</a>
					</Link>
					<Link href='/celebrities' >
						<a onClick={close}>
							Celebrities
						</a>
					</Link>
				</nav>
			</Container>
		</Modal>
	)
}

export default BurgerMenu