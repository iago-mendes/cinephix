import {Swiper} from 'swiper/react'

import Container from '../styles/components/Carousel'
import useDimensions from '../hooks/useDimensions'

interface CarouselProps
{
	className?: string
}

const Carousel: React.FC<CarouselProps> = ({children, className}) =>
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
		<Container className={className} >
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

export default Carousel