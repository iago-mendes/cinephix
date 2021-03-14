import Container from '../../styles/components/modals/MakePredictions'
import React from 'react'
import ModalContainer from './Container'

interface MakePredictionsModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void
}

const MakePredictionsModal: React.FC<MakePredictionsModalProps> = ({isOpen, setIsOpen}) =>
{
	return (
		<ModalContainer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<Container>
				asidjasfosi
			</Container>
		</ModalContainer>
	)
}

export default MakePredictionsModal