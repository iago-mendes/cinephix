import Link from 'next/link'
import Image from 'next/image'
import {FiCalendar} from 'react-icons/fi'

import Container from '../../styles/components/cards/EventMedia'
import {EventMedia} from '../../models/event'
import truncateText from '../../utils/truncateText'
import formatDate from '../../utils/formatDate'

interface EventMediaCardProps
{
	media: EventMedia
	link: string
}

const EventMediaCard: React.FC<EventMediaCardProps> = ({media, link, children}) =>
{
	return (
		<Link href={link} >
			<Container
				as='a'
				href={link}
			>
				<div className='img'>
					<Image src={media.image} width={780} height={1170} layout='responsive' />
				</div>
				<div className='info'>
					<span className='title' >
						{truncateText(media.title, 35)}
					</span>
					<span className='date' >
						<FiCalendar size={15} />
						{formatDate(media.date)}
					</span>
					<p className='overview' >
						{truncateText(media.overview, 50)}
					</p>
				</div>
				{children}
			</Container>
		</Link>
	)
}

export default EventMediaCard