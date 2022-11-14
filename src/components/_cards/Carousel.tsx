import Link from 'next/link'

import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	image: string
	primaryDisplay: string
	secondaryDisplay: string

	link: string
}

export function CarouselCard({
	image,
	primaryDisplay,
	secondaryDisplay,
	link,
	children
}: Props) {
	return (
		<div>
			<Link href={link}>
				<CardContainer
					imageSrc={image}
					cardWidth={{mobile: '20rem', desktop: '30rem'}}
				>
					<span className="title">{truncateText(primaryDisplay, 20)}</span>
					<span className="subtitle">{truncateText(secondaryDisplay, 20)}</span>
					{children}
				</CardContainer>
			</Link>
		</div>
	)
}
