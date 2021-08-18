import Image from 'next/image'
import {ReactNode, memo} from 'react'
import {FiCalendar} from 'react-icons/fi'

import {Container} from './styles'
import {posterBlurPlaceholder} from '../../../assets/images/placeholders'
import truncateText from '../../../utils/truncateText'
import formatDate from '../../../utils/formatDate'
import {SkeletonLoading} from '../../../utils/skeletonLoading'

type Props = React.HTMLAttributes<HTMLDivElement> & {
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

	isLoading?: boolean
}

function CardContainerComponent({
	imageSrc,
	imageBlurData,
	children,
	cardWidth,
	mediaCard,
	isLoading = false,
	...props
}: Props) {
	if (isLoading)
		return (
			<Container cardWidth={cardWidth}>
				<figure>
					<SkeletonLoading avoidAnimation opacity={0.9} />
				</figure>
				<div className="info">
					<span className="title">
						<SkeletonLoading avoidAnimation height="3rem" opacity={0.9} />
					</span>
					<div className="details">
						<span className="venue">
							<SkeletonLoading
								avoidAnimation
								height="1.5rem"
								width="50%"
								opacity={0.9}
							/>
						</span>
					</div>
				</div>
			</Container>
		)

	return (
		<Container cardWidth={cardWidth} {...props}>
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
