import {BsStarFill, BsStarHalf} from 'react-icons/bs'

import Ratings from '../models/ratings'

function getTotalRating(ratings: Ratings, showStars = false, svgSize = 20)
{
	let sum = 0
	let n = 0

	Object.values(ratings).map(rating =>
	{
		if (rating >= 0)
		{
			sum += rating
			n += 1
		}
	})

	const avg = Math.round(sum/n * 10) / 10

	if (showStars)
	{
		const avg5 = Math.round(avg) / 2
		const [fillStars, halfStar] = String(avg5).split('.').map(s => Number(s))

		console.log('[fillStars]', fillStars)
		console.log('[halfStar]', halfStar)

		let tmp: string[] = []
		for (let i = 0; i < fillStars; i++)
			tmp.push('')

		return (
			<>
				{
					tmp.map(() => (
						<BsStarFill size={svgSize} style={{marginRight: 5}} />
					))
				}
				{
					halfStar && (
						<BsStarHalf size={svgSize} />
					)
				}
			</>
		)
	}

	if (n === 0)
		return undefined
	else
		return avg
}

export default getTotalRating