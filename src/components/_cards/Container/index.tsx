import Image from 'next/image'
import {ReactNode, memo} from 'react'

import {Container} from './styles'
import {posterBlurPlaceholder} from '../../../assets/images/placeholders'

type Props = {
	imageSrc: string
	imageBlurData?: string
	children: ReactNode

	cardWidth?: {
		mobile: string | number
		desktop: string | number
	}
}

function CardContainerComponent({
	imageSrc,
	imageBlurData,
	children,
	cardWidth
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
			<div className="info">{children}</div>
		</Container>
	)
}

export const CardContainer = memo(CardContainerComponent)
