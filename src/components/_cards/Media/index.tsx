import Link from 'next/link'
import {FiCalendar} from 'react-icons/fi'
import {CSSProperties} from 'styled-components'

import formatDate from '../../../utils/formatDate'
import truncateText from '../../../utils/truncateText'
import {CardContainer} from '../Container'

export interface Media {
	id: number
	image: string
	title: string
	overview: string
	date: string
	type?: string
}

interface MediaCardProps {
	media: Media
	showOverview?: boolean

	link: string

	style?: CSSProperties
	onClick?: (p: any) => void
}

const MediaCard: React.FC<MediaCardProps> = ({
	media,
	showOverview = false,
	link,
	// style = {},
	onClick = () => {}
}) => {
	return (
		<Link href={link}>
			<a onClick={onClick}>
				<CardContainer imageSrc={media.image}>
					<h1>{truncateText(media.title, 35)}</h1>
					<h3>
						<FiCalendar size={15} />
						{formatDate(media.date)}
					</h3>
					{showOverview && <p>{truncateText(media.overview, 120)}</p>}
				</CardContainer>
			</a>
		</Link>
	)
}

export default MediaCard
