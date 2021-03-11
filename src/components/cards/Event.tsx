import Container from '../../styles/components/cards/Event'
import {EventListed} from '../../models/event'

interface EventCardProps
{
	event: EventListed
}

const EventCard: React.FC<EventCardProps> = ({event}) =>
{
	return (
		<Container>
			<svg width={50} height={50}>
				<circle cx={25} cy={25} r={25} fill={event.color} />
			</svg>
			<div className='info'>
				<span className='name'>
					{event.name}
				</span>
				<p className='description'>
					{event.description}
				</p>
			</div>
		</Container>
	)
}

export default EventCard