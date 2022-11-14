import Link from 'next/link'
import {FiCalendar} from 'react-icons/fi'

import formatDate from '../../utils/formatDate'
import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'

export type Media = {
	id: number
	image: string
	title: string
	overview: string
	date: string
	type?: string
}

type Props = {
	media: Media
	showOverview?: boolean

	link: string

	onClick?: (p: any) => void
}

export function MediaCard({
	media,
	showOverview = false,
	link,
	onClick = () => {}
}: Props) {
	return (
		<Link href={link} onClick={onClick}>
			<CardContainer imageSrc={media.image}>
				<span className="title">{truncateText(media.title, 35)}</span>
				<span className="subtitle">
					<FiCalendar />
					{formatDate(media.date)}
				</span>
				{showOverview && <p>{truncateText(media.overview, 120)}</p>}
			</CardContainer>
		</Link>
	)
}
