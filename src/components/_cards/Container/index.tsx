import {ReactNode, memo} from 'react'
import {FiCalendar} from 'react-icons/fi'

import {Container} from './styles'
import truncateText from '../../../utils/truncateText'
import formatDate from '../../../utils/formatDate'
import {SkeletonLoading} from '../../../utils/skeletonLoading'
import {OptimizedImage} from '../../OptimizedImage'

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
					<SkeletonLoading avoidAnimation height="3rem" opacity={0.9} />
					<div className="details">
						<SkeletonLoading
							avoidAnimation
							height="1.5rem"
							width="10rem"
							opacity={0.9}
						/>
					</div>
				</div>
			</Container>
		)

	return (
		<Container cardWidth={cardWidth} {...props}>
			<OptimizedImage src={imageSrc} blurData={imageBlurData} />
			<div className="info">
				{children}
				{mediaCard && (
					<div className="media-card">
						<OptimizedImage
							src={mediaCard.imageSrc}
							blurData={imageBlurData}
							className="media-card-image-container"
						/>
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
