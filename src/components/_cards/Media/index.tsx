import Image from 'next/image'
import Link from 'next/link'
import {FiCalendar} from 'react-icons/fi'
import {CSSProperties} from 'styled-components'

import Container from './styles'
import formatDate from '../../../utils/formatDate'
import truncateText from '../../../utils/truncateText'

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
	style = {},
	onClick = () => {}
}) => {
	return (
		<Link href={link}>
			<Container style={style} as="a" href={link} onClick={onClick}>
				<div className="img">
					<Image
						src={media.image}
						width={780}
						height={1170}
						layout="responsive"
					/>
				</div>
				<div className="info">
					<h1>{truncateText(media.title, 35)}</h1>
					<h3>
						<FiCalendar size={15} />
						{formatDate(media.date)}
					</h3>
					{showOverview && <p>{truncateText(media.overview, 120)}</p>}
				</div>
			</Container>
		</Link>
	)
}

export default MediaCard
