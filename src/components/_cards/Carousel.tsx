import Link from 'next/link'

import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'

type Props = {
	image: string
	primaryDisplay: string
	secondaryDisplay: string

	link: string
}

export function CarouselCard({
	image,
	primaryDisplay,
	secondaryDisplay,
	link
}: Props) {
	return (
		<Link href={link}>
			<a>
				<CardContainer imageSrc={image}>
					<span className="title">{truncateText(primaryDisplay, 20)}</span>
					<span className="subtitle">{truncateText(secondaryDisplay, 20)}</span>
				</CardContainer>
			</a>
		</Link>
	)
}
