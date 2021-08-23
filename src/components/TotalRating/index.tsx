import {IconType} from 'react-icons'
import {BsStarFill, BsStarHalf} from 'react-icons/bs'

import {Container} from './styles'

type Props = {
	rating: number
}

export function TotalRating({rating}: Props) {
	function getStars() {
		const avg5 = Math.round(rating) / 2

		const numberOfFilledStars = Math.floor(avg5)
		const showHalfStar = avg5 - numberOfFilledStars !== 0

		const stars: IconType[] = []

		for (let i = 0; i < numberOfFilledStars; i++) stars.push(BsStarFill)
		if (showHalfStar) stars.push(BsStarHalf)

		return stars
	}

	return (
		<Container>
			<div>
				{getStars().map((Star, index) => (
					<Star key={index} />
				))}
			</div>
			<span>({rating})</span>
		</Container>
	)
}
