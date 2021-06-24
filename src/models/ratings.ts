interface Ratings {
	[ratingKey: string]: number
}

export const defaultTvshowRatings: Ratings = {
	engagement: -1,
	consistency: -1,
	screenplay: -1,
	acting: -1,
	cinematography: -1,
	musicAndSound: -1
}

export const defaultMovieRatings: Ratings = {
	screenplay: -1,
	pacing: -1,
	acting: -1,
	cinematography: -1,
	musicAndSound: -1
}

export default Ratings
