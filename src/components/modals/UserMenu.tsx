import Modal from 'react-modal'
import {BsFillTriangleFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {signOut} from 'next-auth/client'

import Container, {modalStyle} from '../../styles/components/modals/UserMenu'
import useUser from '../../hooks/useUser'
import Link from 'next/link'

Modal.setAppElement('#__next')

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
		<Modal
			isOpen={isOpen}
			style={modalStyle}
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
						<Link href='/user'>
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
		</Modal>
	)
}

export default UserMenu