import Modal from 'react-modal'
import {BsFillTriangleFill} from 'react-icons/bs'

import Container, {modalStyle} from '../../styles/components/modals/UserMenu'

Modal.setAppElement('#__next')

interface UserMenuProps
{
	isOpen: boolean
	setIsOpen: Function
}

const UserMenu: React.FC<UserMenuProps> = ({isOpen, setIsOpen}) =>
{
	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container
				onMouseLeave={() => setIsOpen(false)}
			>
				<div className="detail">
					<BsFillTriangleFill size={10} />
				</div>
				<main></main>
			</Container>
		</Modal>
	)
}

export default UserMenu