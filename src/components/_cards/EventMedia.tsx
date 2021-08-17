import Link from 'next/link'
import {ReactNode} from 'react'
import {FiCalendar} from 'react-icons/fi'

import {EventMedia} from '../../models/event'
import truncateText from '../../utils/truncateText'
import formatDate from '../../utils/formatDate'
import {CardContainer} from './Container'

type Props = {
	media: EventMedia
	link: string
	children?: ReactNode
}

export function EventMediaCard({media, link, children}: Props) {
	return (
		<Link href={link}>
			<a>
				<CardContainer imageSrc={media.image}>
					<span className="title">{truncateText(media.title, 35)}</span>
					<span className="subtitle">
						<FiCalendar />
						{formatDate(media.date)}
					</span>
					<p>{truncateText(media.overview, 120)}</p>
					{children}
				</CardContainer>
			</a>
		</Link>
	)
}
