import {memo} from 'react'
import Image from 'next/image'

import {Container} from './styles'
import {posterBlurPlaceholder} from '../../assets/images/placeholders'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	src: string
	blurData?: string
	alt?: string
}

function OptimizedImageComponent({src, blurData, alt, ...props}: Props) {
	return (
		<Container {...props}>
			<Image
				src={src}
				alt={alt}
				width={780}
				height={1170}
				layout="responsive"
				placeholder="blur"
				blurDataURL={blurData ?? posterBlurPlaceholder}
			/>
		</Container>
	)
}

export const OptimizedImage = memo(OptimizedImageComponent)
