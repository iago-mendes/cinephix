import Image from 'next/image'
import {useRouter} from 'next/router'
import {FiCalendar} from 'react-icons/fi'
import {CSSProperties} from 'styled-components'

import Container from '../styles/components/MediaCard'
import formatDate from '../utils/formatDate'
import truncateText from '../utils/truncateText'

export interface Media
{
	id: number
	image: string
	title: string
	overview: string
	date: string
	type?: string
}

interface MediaCardProps
{
	media: Media
	showOverview?: boolean

	type: string
	navigateOnClick?: boolean

	style?: CSSProperties
}

const MediaCard: React.FC<MediaCardProps> = ({media, showOverview = false, type, navigateOnClick = true, style = {}}) =>
{
	const Router = useRouter()

	function handleNavigate()
	{
		if (navigateOnClick)
			Router.push(`/${type}s/${media.id}`)
	}

	return (
		<Container style={style} onClick={handleNavigate} >
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