import Slider from 'react-slick'

import Container from './styles'
import {Control} from './control'

type Props = React.HTMLAttributes<HTMLDivElement>

function Carousel({children, ...props}: Props) {
	return (
		<Container {...props}>
			<Slider
				lazyLoad="ondemand"
				centerMode
				prevArrow={<Control direction="left" />}
				nextArrow={<Control direction="right" />}
				slidesToShow={3}
				slidesToScroll={3}
				responsive={[
					{breakpoint: 1050, settings: {slidesToShow: 2}},
					{breakpoint: 750, settings: {slidesToShow: 1}}
				]}
			>
				{children}
			</Slider>
		</Container>
	)
}

export default Carousel
