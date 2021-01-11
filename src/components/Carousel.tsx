import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'

import Container from '../styles/components/Carousel'

const Carousel: React.FC = ({children}) =>
{
	return (
		<Container>
			<Swiper
				spaceBetween={50}
				slidesPerView={3}
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
}

export const CarouselCard: React.FC<CarouselCardProps> = ({image, primaryDisplay, secondaryDisplay}) =>
{
	return (
		<div className='card'>
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