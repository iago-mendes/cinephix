import Modal from 'react-modal'

import {modalStyle} from '../../styles/global'
import Loading from '../Loading'
import {useAvoidScroll} from '../../hooks/useAvoidScroll'

Modal.setAppElement('#__next')

interface ModalContainerProps {
	isOpen: boolean
}

const LoadingModal: React.FC<ModalContainerProps> = ({isOpen}) => {
	useAvoidScroll(isOpen)

	return (
		<Modal isOpen={isOpen} style={modalStyle}>
			<Loading />
		</Modal>
	)
}

export default LoadingModal
