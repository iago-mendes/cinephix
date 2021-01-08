import Image from 'next/image'
import {FiCalendar, FiUser} from 'react-icons/fi'

import Container from '../styles/components/CelebrityCard'
import {Media} from './MediaCard'

export interface Celebrity
{
	id: number
	image: string
	name: string
	knownForDepartment: string
	knownFor: Media
}

interface CelebrityCardProps
{
	celebrity: Celebrity
	showKnownFor?: boolean
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({celebrity, showKnownFor = false}) =>
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
		<Container>
			<div className='img'>
				<Image src={celebrity.image} width={780} height={1170} layout='responsive' />
			</div>
			<div className='info'>
				<h1>{truncateText(celebrity.name, 20)}</h1>
				<h3>
					<FiUser size={15} />
					{celebrity.knownForDepartment}
				</h3>
				{showKnownFor && (
					<div className="media">
						<div className='mediaImg'>
							<Image src={celebrity.knownFor.image} width={780} height={1170} layout='responsive' />
						</div>
						<div className='mediaInfo'>
							<h1>{truncateText(celebrity.knownFor.title, 35)}</h1>
							<h3>
								<FiCalendar size={15} />
								{formatDate(celebrity.knownFor.date)}
							</h3>
						</div>
					</div>
				)}
			</div>
		</Container>
	)
}

export default CelebrityCard