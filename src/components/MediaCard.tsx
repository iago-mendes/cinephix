import Image from 'next/image'
import {FiCalendar} from 'react-icons/fi'
import {CSSProperties} from 'styled-components'

import Container from '../styles/components/MediaCard'

export interface Media
{
	id: number
	image: string
	title: string
	overview: string
	date: string
}

interface MediaCardProps
{
	media: Media
	showOverview?: boolean

	style?: CSSProperties
}

const MediaCard: React.FC<MediaCardProps> = ({media, showOverview = false, style = {}}) =>
{
	function truncateText(text: string, length: number)
	{
		let truncated = text

		if (truncated.length > length)
			truncated = truncated.substr(0, length) + '...';

		return truncated;
	}

	function formatDate(unformatedDate: string)
	{
		const months =
		[
			'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
		]

		const date = unformatedDate.split('-').map(s => Number(s))
		const formatedDate = `${months[date[1]-1]} ${date[2]}, ${date[0]}`
		return formatedDate
	}

	return (
		<Container style={style} >
			<div className='img'>
				<Image src={media.image} width={780} height={1170} layout='responsive' />
			</div>
			<div className='info'>
				<h1>{truncateText(media.title, 35)}</h1>
				<h3>
					<FiCalendar size={15} />
					{formatDate(media.date)}
				</h3>
				{showOverview && <p>{truncateText(media.overview, 120)}</p>}
			</div>
		</Container>
	)
}

export default MediaCard