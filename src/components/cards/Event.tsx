import Container from '../../styles/components/cards/Event'
import {EventListed} from '../../models/event'
import truncateText from '../../utils/truncateText'

interface EventCardProps
{
	event: EventListed
}

const EventCard: React.FC<EventCardProps> = ({event}) =>
{
	return (
		<Container>
			<svg width={50} height={50}>
				<rect width={50} height={50} fill={event.color} />
			</svg>
			<div className='info'>
				<span className='name'>
					{event.name}
				</span>
				<p className='description'>
					{truncateText(event.description, 100)}
				</p>
			</div>
		</Container>
	)
}

export default EventCard