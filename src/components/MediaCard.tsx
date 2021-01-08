import Image from 'next/image'

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
	showOverview: boolean
}

const MediaCard: React.FC<MediaCardProps> = ({media, showOverview}) =>
{
	return (
		<Container>
			<div className="img">
				<Image src={media.image} width={780} height={1170} layout='responsive' />
			</div>
			<div className="info">
				<h1>{media.title}</h1>
				<h3>{media.date}</h3>
				{showOverview && <p>{media.overview}</p>}
			</div>
		</Container>
	)
}

export default MediaCard