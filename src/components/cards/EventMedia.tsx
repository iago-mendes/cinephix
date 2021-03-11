import Container from '../../styles/components/cards/EventMedia'
import {EventMedia} from '../../models/event'
import Link from 'next/link'
import Image from 'next/image'
import truncateText from '../../utils/truncateText'
import { FiCalendar } from 'react-icons/fi'
import formatDate from '../../utils/formatDate'

interface EventMediaCardProps
{
	media: EventMedia
	link: string
}

const EventMediaCard: React.FC<EventMediaCardProps> = ({media, link}) =>
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
						{truncateText(media.title + media.title + media.title + media.title, 35)}
					</span>
					<span className='date' >
						<FiCalendar size={15} />
						{formatDate(media.date)}
					</span>
					<p className='overview' >
						{truncateText(media.overview, 50)}
					</p>
				</div>
			</Container>
		</Link>
	)
}

export default EventMediaCard