import Container from '../../styles/components/modals/ParticipantPredictions'
import ModalContainer from './Container'
import {GroupParticipant} from '../../models/group'
import EventCelebrityCard from '../cards/EventCelebrity'
import { EventCelebrity, EventMedia } from '../../models/event'
import EventMediaCard from '../cards/EventMedia'

interface ParticipantPredictionsModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	participant: GroupParticipant
	eventName: string
	groupUrlId: string
}

const ParticipantPredictionsModal: React.FC<ParticipantPredictionsModalProps> =
({isOpen, setIsOpen, participant, eventName, groupUrlId}) =>
{
	function isMedia(item: EventMedia | EventCelebrity): item is EventMedia
	{
		return 'title' in item
	}

	function isCelebrity(item: EventCelebrity | EventMedia): item is EventCelebrity
	{
		return 'celebrity' in item
	}

	return (
		<ModalContainer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<Container>
				<h1>
					{participant.name}'s predictions for the {eventName}
				</h1>

				<div className='grid' >
					{participant.predictions.map((prediction, index) => (
						<div className='prediction' key={index} >
							<h2>
								{prediction.category.name}
							</h2>

							{isCelebrity(prediction.guess) && (
								<EventCelebrityCard
									eventCelebrity={prediction.guess}
									link={`/groups/${groupUrlId}`}
								/>
							)}

							{isMedia(prediction.guess) && (
								<EventMediaCard
									media={prediction.guess}
									link={`/groups/${groupUrlId}`}
								/>
							)}
						</div>
					))}
				</div>
			</Container>
		</ModalContainer>
	)
}

export default ParticipantPredictionsModal