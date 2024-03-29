import Link from 'next/link'

import {Container} from './styles'
import {EventListed} from '../../../models/event'
import truncateText from '../../../utils/truncateText'

type Props = {
	event: EventListed
}

export function EventCard({event}: Props) {
	const link = `/events/${event.id}`

	return (
		<Link href={link} legacyBehavior>
			<Container as="a" href={link}>
				<svg width={50} height={50}>
					<rect width={50} height={50} fill={event.color} />
				</svg>
				<div className="info">
					<span className="name">{event.name}</span>
					<p className="description">{truncateText(event.description, 100)}</p>
				</div>
			</Container>
		</Link>
	)
}
