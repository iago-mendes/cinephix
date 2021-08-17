import {FiUser} from 'react-icons/fi'
import Link from 'next/link'

import {Media} from './Media'
import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'

export type Celebrity = {
	id: number
	image: string
	name: string
	knownForDepartment: string
	knownFor: Media
}

type Props = {
	celebrity: Celebrity
	showKnownFor?: boolean
}

export function CelebrityCard({celebrity, showKnownFor = false}: Props) {
	return (
		<Link href={`/celebrities/${celebrity.id}`}>
			<a>
				<CardContainer
					imageSrc={celebrity.image}
					mediaCard={
						showKnownFor &&
						celebrity.knownFor && {
							imageSrc: celebrity.knownFor.image,
							title: celebrity.knownFor.title,
							date: celebrity.knownFor.date
						}
					}
				>
					<span className="title">{truncateText(celebrity.name, 20)}</span>
					<span className="subtitle">
						<FiUser />
						{celebrity.knownForDepartment}
					</span>
				</CardContainer>
			</a>
		</Link>
	)
}
