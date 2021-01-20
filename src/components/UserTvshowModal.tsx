import Modal from 'react-modal'
import {FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'

import Container from '../styles/components/UserTvshowModal'
import {modalStyle} from '../styles/global'
import React from 'react'

Modal.setAppElement('#__next')

interface UserTvshowModalProps
{
	isOpen: boolean
	setIsOpen: Function
}

const UserTvshowModal: React.FC<UserTvshowModalProps> = ({isOpen, setIsOpen}) =>
{
	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<button className='expand' title='Expand' >
						<BiExpand size={25} />
					</button>
					<button className='close' title='Close' onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>

			</Container>
		</Modal>
	)
}

export default UserTvshowModal