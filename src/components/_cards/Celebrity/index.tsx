import Image from 'next/image'
import {FiCalendar, FiUser} from 'react-icons/fi'
import Link from 'next/link'

import {KnownForContainer} from './styles'
import {Media} from '../Media'
import formatDate from '../../../utils/formatDate'
import truncateText from '../../../utils/truncateText'
import {CardContainer} from '../Container'

export interface Celebrity {
	id: number
	image: string
	name: string
	knownForDepartment: string
	knownFor: Media
}

interface CelebrityCardProps {
	celebrity: Celebrity
	showKnownFor?: boolean
}

const CelebrityCard: React.FC<CelebrityCardProps> = ({
	celebrity,
	showKnownFor = false
}) => {
	return (
		<Link href={`/celebrities/${celebrity.id}`}>
			<a>
				<CardContainer imageSrc={celebrity.image}>
					<h1>{truncateText(celebrity.name, 20)}</h1>
					<h3>
						<FiUser size={15} />
						{celebrity.knownForDepartment}
					</h3>
					{showKnownFor && celebrity.knownFor && (
						<KnownForContainer>
							<figure>
								<Image
									src={celebrity.knownFor.image}
									width={780}
									height={1170}
									layout="responsive"
								/>
							</figure>
							<div className="mediaInfo">
								<h2>{truncateText(celebrity.knownFor.title, 35)}</h2>
								<h3>
									<FiCalendar size={15} />
									{formatDate(celebrity.knownFor.date)}
								</h3>
							</div>
						</KnownForContainer>
					)}
				</CardContainer>
			</a>
		</Link>
	)
}

export default CelebrityCard
