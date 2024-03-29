import Image, {StaticImageData} from 'next/legacy/image'
import {PropsWithChildren} from 'react'

import Container from './styles'

interface HeaderWithBackgroundProps {
	background: StaticImageData
	display: string
}

const HeaderWithBackground = ({
	background,
	display,
	children
}: PropsWithChildren<HeaderWithBackgroundProps>) => {
	return (
		<Container>
			<div className="background">
				<Image
					src={background}
					width={1500}
					height={1000}
					layout="responsive"
					quality={10}
					placeholder="blur"
				/>
			</div>
			<h1>{display}</h1>
			{children}
		</Container>
	)
}

export default HeaderWithBackground
