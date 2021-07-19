import Image from 'next/image'
import Link from 'next/link'
import {FiCalendar} from 'react-icons/fi'

import Container from './styles'
import {EventCelebrity} from '../../../models/event'
import truncateText from '../../../utils/truncateText'
import formatDate from '../../../utils/formatDate'

interface EventCelebrityCardProps {
	eventCelebrity: EventCelebrity
	link: string
}

const EventCelebrityCard: React.FC<EventCelebrityCardProps> = ({
	eventCelebrity,
	link,
	children
}) => {
	const celebrity = eventCelebrity.celebrity
	const media = eventCelebrity.media

	return (
		<Link href={link}>
			<Container as="a" href={link}>
				<div className="img">
					<Image
						src={celebrity.image}
						width={780}
						height={1170}
						layout="responsive"
					/>
				</div>
				<div className="info">
					<span className="name">{truncateText(celebrity.name, 35)}</span>
					<div className="media">
						<div className="mediaImg">
							<Image
								src={media.image}
								width={780}
								height={1170}
								layout="responsive"
							/>
						</div>
						<div className="mediaInfo">
							<span className="title">{truncateText(media.title, 15)}</span>
							<span className="date">
								<FiCalendar size={15} />
								{formatDate(media.date)}
							</span>
						</div>
					</div>
				</div>
				{children}
			</Container>
		</Link>
	)
}

export default EventCelebrityCard
