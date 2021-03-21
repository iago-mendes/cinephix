import Modal from 'react-modal'
import {FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'
import Link from 'next/link'

import Container from '../../styles/components/modals/Container'
import {modalStyle} from '../../styles/global'

Modal.setAppElement('#__next')

interface ModalContainerProps
{
	isOpen: boolean
	handleClose: () => void

	expandLink?: string
}

const ModalContainer: React.FC<ModalContainerProps> = ({isOpen, handleClose, expandLink, children}) =>
{
	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					{expandLink && (
						<Link href={expandLink} >
							<a className='expand' title='Expand' onClick={handleClose} >
								<BiExpand size={25} />
							</a>
						</Link>
					)}
					<button className='close' title='Close' onClick={handleClose} >
						<FiX size={25} />
					</button>
				</header>

				<main>
					{children}
				</main>
			</Container>
		</Modal>
	)
}

export default ModalContainer