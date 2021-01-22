interface Ratings
{
	[ratingKey: string]: number
}

function calcTotalRating(ratings: Ratings)
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

	if (n === 0)
		return undefined
	else
		return Math.round(sum/n * 10) / 10
}

export default calcTotalRating