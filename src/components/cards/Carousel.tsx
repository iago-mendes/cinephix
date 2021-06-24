import Image from 'next/image'
import Link from 'next/link'

import Container from '../../styles/components/cards/Carousel'
import truncateText from '../../utils/truncateText'

interface CarouselCardProps {
	image: string
	primaryDisplay: string
	secondaryDisplay: string

	link: string
}

const CarouselCard: React.FC<CarouselCardProps> = ({
	image,
	primaryDisplay,
	secondaryDisplay,
	link
}) => {
	return (
		<Link href={link}>
			<Container as="a" href={link}>
				<div className="img">
					<Image src={image} width={780} height={1170} layout="responsive" />
				</div>
				<div className="info">
					<h1>{truncateText(primaryDisplay, 20)}</h1>
					<h2>{truncateText(secondaryDisplay, 20)}</h2>
				</div>
			</Container>
		</Link>
	)
}

export default CarouselCard
