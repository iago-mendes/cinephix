import Image from 'next/image'
import {FiCalendar, FiUser} from 'react-icons/fi'
import Link from 'next/link'

import Container from '../../styles/components/cards/Celebrity'
import {Media} from './Media'
import formatDate from '../../utils/formatDate'
import truncateText from '../../utils/truncateText'

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
	width?: number | string
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({celebrity, showKnownFor = false, width = '40rem'}) =>
{
	return (
		<Link href={`/celebrities/${celebrity.id}`} >
			<Container
				as='a'
				href={`/celebrities/${celebrity.id}`}
			>
				<div className='img'>
					<Image src={celebrity.image} width={780} height={1170} layout='responsive' />
				</div>
				<div className='info'>
					<h1>{truncateText(celebrity.name, 20)}</h1>
					<h3>
						<FiUser size={15} />
						{celebrity.knownForDepartment}
					</h3>
					{(showKnownFor && celebrity.knownFor) && (
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
		</Link>
	)
}

export default CelebrityCard