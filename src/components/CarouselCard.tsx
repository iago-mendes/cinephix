import Image from 'next/image'
import Link from 'next/link'

import Container from '../styles/components/CarouselCard'

interface CarouselCardProps
{
	image: string
	primaryDisplay: string
	secondaryDisplay: string

	link: string
}

const CarouselCard: React.FC<CarouselCardProps> = ({image, primaryDisplay, secondaryDisplay, link}) =>
{
	return (
		<Link href={link} >
			<Container
				as='a'
				href={link}
			>
				<div className='img'>
					<Image src={image} width={780} height={1170} layout='responsive' />
				</div>
				<div className='info'>
					<h1>{primaryDisplay}</h1>
					<h2>{secondaryDisplay}</h2>
				</div>
			</Container>
		</Link>
	)
}

export default CarouselCard