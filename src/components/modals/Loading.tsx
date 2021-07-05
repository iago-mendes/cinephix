import Loading from '../Loading'
import {useAvoidScroll} from '../../hooks/useAvoidScroll'
import ModalContainer from './Container'

interface ModalContainerProps {
	isOpen: boolean
}

const LoadingModal: React.FC<ModalContainerProps> = ({isOpen}) => {
	useAvoidScroll(isOpen)

	return (
		<ModalContainer
			isOpen={isOpen}
			handleClose={() => {}}
			showCompleteContainer={false}
		>
			<Loading />
		</ModalContainer>
	)
}

export default LoadingModal
