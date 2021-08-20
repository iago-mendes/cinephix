import Slider from 'react-slick'

import Container from './styles'
import {Control} from './control'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	numberOfItems: number
}

export function Carousel({numberOfItems, children, ...props}: Props) {
	if (numberOfItems <= 0) return null

	return (
		<Container {...props}>
			<Slider
				lazyLoad="ondemand"
				centerMode
				prevArrow={<Control direction="left" />}
				nextArrow={<Control direction="right" />}
				slidesToShow={numberOfItems < 3 ? numberOfItems : 3}
				responsive={[
					{
						breakpoint: 1050,
						settings: {slidesToShow: numberOfItems < 2 ? numberOfItems : 2}
					},
					{breakpoint: 750, settings: {slidesToShow: 1}}
				]}
			>
				{children}
			</Slider>
		</Container>
	)
}
