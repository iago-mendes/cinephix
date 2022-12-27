import Container from './styles'
import ModalContainer from '../Container'
import {GroupParticipant} from '../../../models/group'
import {EventCelebrityCard} from '../../_cards/EventCelebrity'
import {EventCelebrity, EventMedia} from '../../../models/event'
import {EventMediaCard} from '../../_cards/EventMedia'
import WinnerSign from '../../WinnerSign'

interface ParticipantPredictionsModalProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	participant: GroupParticipant
	eventName: string
}

const ParticipantPredictionsModal: React.FC<
	ParticipantPredictionsModalProps
> = ({isOpen, setIsOpen, participant, eventName}) => {
	function isMedia(item: EventMedia | EventCelebrity): item is EventMedia {
		return 'title' in item
	}

	function isCelebrity(
		item: EventCelebrity | EventMedia
	): item is EventCelebrity {
		return 'celebrity' in item
	}

	return (
		<ModalContainer isOpen={isOpen} handleClose={() => setIsOpen(false)}>
			<Container>
				<h1>
					{participant.name}'s predictions for the {eventName}
				</h1>

				{participant.predictions.length === 0 && (
					<span className="message">
						This participant hasn't made any predictions yet!
					</span>
				)}

				<div className="grid">
					{participant.predictions.map((prediction, index) => (
						<div className="prediction" key={index}>
							<h2>{prediction.category.name}</h2>

							{isCelebrity(prediction.guess) && (
								<EventCelebrityCard
									eventCelebrity={prediction.guess}
									link={`/celebrities/${prediction.guess.celebrity.id}`}
								>
									{prediction.guess.isResult === true && <WinnerSign />}
								</EventCelebrityCard>
							)}

							{isMedia(prediction.guess) && (
								<EventMediaCard
									media={prediction.guess}
									link={`/${prediction.category.type}/${prediction.guess.id}`}
								>
									{prediction.guess.isResult === true && <WinnerSign />}
								</EventMediaCard>
							)}
						</div>
					))}
				</div>
			</Container>
		</ModalContainer>
	)
}

export default ParticipantPredictionsModal
