import {memo} from 'react'

import {Container} from './styles'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	src: string
	blurData?: string
	alt?: string
}

function OptimizedImageComponent({src, blurData, alt, ...props}: Props) {
	return (
		<Container {...props}>
			<img
				src={src}
				alt={alt}
			/>
		</Container>
	)
}

export const OptimizedImage = memo(OptimizedImageComponent)
