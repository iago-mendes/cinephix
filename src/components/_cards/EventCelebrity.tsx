import Link from 'next/link'
import {ReactNode} from 'react'

import {EventCelebrity} from '../../models/event'
import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'

type Props = {
	eventCelebrity: EventCelebrity
	link: string
	children?: ReactNode
}

export function EventCelebrityCard({eventCelebrity, link, children}: Props) {
	const celebrity = eventCelebrity.celebrity
	const media = eventCelebrity.media

	return (
		<Link href={link}>
			<CardContainer
				imageSrc={celebrity.image}
				mediaCard={{
					imageSrc: media.image,
					title: media.title,
					date: media.date
				}}
				cardWidth={{mobile: '20rem', desktop: '30rem'}}
			>
				<span className="title">{truncateText(celebrity.name, 20)}</span>
				{children}
			</CardContainer>
		</Link>
	)
}
