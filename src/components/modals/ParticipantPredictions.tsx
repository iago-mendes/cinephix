import Container from '../../styles/components/modals/ParticipantPredictions'
import ModalContainer from './Container'
import {GroupParticipant} from '../../models/group'

interface ParticipantPredictionsModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	participant: GroupParticipant
	eventName: string
}

const ParticipantPredictionsModal: React.FC<ParticipantPredictionsModalProps> =
({isOpen, setIsOpen, participant, eventName}) =>
{
	return (
		<ModalContainer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<Container>
				<h1>
					{participant.name}'s predictions for the {eventName}
				</h1>

				{participant.predictions.map((prediction, index) => (
					<div className='prediction' key={index} >
						<h2>
							{prediction.category.name}
						</h2>
					</div>
				))}
			</Container>
		</ModalContainer>
	)
}

export default ParticipantPredictionsModal