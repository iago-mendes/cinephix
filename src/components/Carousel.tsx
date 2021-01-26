import Image from 'next/image'
import {useRouter} from 'next/router'
import {Swiper} from 'swiper/react'

import Container from '../styles/components/Carousel'
import useDimensions from '../hooks/useDimensions'

const Carousel: React.FC = ({children}) =>
{
	const {width} = useDimensions()

	function getSlidesPerView()
	{
		if (width <= 900)
			return 1
		else if (width <= 1250)
			return 2
		else
			return 3
	}

	return (
		<Container>
			<Swiper
				spaceBetween={50}
				slidesPerView={getSlidesPerView()}
				navigation
				className='swiper'
			>
				{children}
			</Swiper>
		</Container>
	)
}

interface CarouselCardProps
{
	image: string
	primaryDisplay: string
	secondaryDisplay: string

	link: string
}

export const CarouselCard: React.FC<CarouselCardProps> = ({image, primaryDisplay, secondaryDisplay, link}) =>
{
	const Router = useRouter()

	return (
		<div className='card' onClick={() => Router.push(link)}>
			<div className='img'>
				<Image src={image} width={780} height={1170} layout='responsive' />
			</div>
			<div className='info'>
				<h1>{primaryDisplay}</h1>
				<h2>{secondaryDisplay}</h2>
			</div>
		</div>
	)
}

export default Carousel