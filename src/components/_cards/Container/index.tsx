import Image from 'next/image'
import {ReactNode, memo} from 'react'
import {FiCalendar} from 'react-icons/fi'

import {Container} from './styles'
import {posterBlurPlaceholder} from '../../../assets/images/placeholders'
import truncateText from '../../../utils/truncateText'
import formatDate from '../../../utils/formatDate'

type Props = {
	imageSrc: string
	imageBlurData?: string
	children: ReactNode

	cardWidth?: {
		mobile: string | number
		desktop: string | number
	}

	mediaCard?: {
		imageSrc: string
		imageBlurData?: string
		title: string
		date: string
	}
}

function CardContainerComponent({
	imageSrc,
	imageBlurData,
	children,
	cardWidth,
	mediaCard
}: Props) {
	return (
		<Container cardWidth={cardWidth}>
			<figure>
				<Image
					src={imageSrc}
					width={780}
					height={1170}
					layout="responsive"
					placeholder="blur"
					blurDataURL={imageBlurData ?? posterBlurPlaceholder}
				/>
			</figure>
			<div className="info">
				{children}
				{mediaCard && (
					<div className="media-card">
						<figure className="media-card-image-container">
							<Image
								src={mediaCard.imageSrc}
								width={780}
								height={1170}
								layout="responsive"
								placeholder="blur"
								blurDataURL={mediaCard.imageBlurData ?? posterBlurPlaceholder}
							/>
						</figure>
						<div className="info">
							<span className="title">{truncateText(mediaCard.title, 17)}</span>
							<span className="date">
								<FiCalendar />
								{formatDate(mediaCard.date)}
							</span>
						</div>
					</div>
				)}
			</div>
		</Container>
	)
}

export const CardContainer = memo(CardContainerComponent)
