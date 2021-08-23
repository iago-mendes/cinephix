import Ratings from '../models/ratings'
import {TotalRating} from '../components/TotalRating'

function getTotalRating(ratings: Ratings, showStars = false) {
	let sum = 0
	let n = 0

	Object.values(ratings).map(rating => {
		if (rating >= 0) {
			sum += rating
			n += 1
		}
	})

	const avg = Math.round((sum / n) * 10) / 10

	if (showStars) return <TotalRating rating={avg} />

	if (n === 0) return undefined
	else return avg
}

export default getTotalRating
