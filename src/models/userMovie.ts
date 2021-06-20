import MovieDetails, { defaultMovieDetails } from './movie'
import Ratings, {defaultMovieRatings} from './ratings'

interface UserMovie
{
	data: MovieDetails
	watched: boolean
	venue?: string
	ratings: Ratings
}

export const defaultUserMovie: UserMovie =
{
	data: defaultMovieDetails,
	watched: false,
	ratings: defaultMovieRatings
}

export interface UserMovieListed
{
	data:
	{
		id: number
		image: string
		title: string
		overview: string
		date: string
	}
	watched: boolean
	venue?: string
	ratings: Ratings
}

export const defaultUserMovieListed: UserMovieListed =
{
	data:
	{
		id: 0,
		image: '',
		title: '',
		overview: '',
		date: ''
	},
	watched: false,
	ratings: defaultMovieRatings
}

export const loadingUserMovieListed: UserMovieListed =
{
	data:
	{
		id: -1,
		image: '',
		title: '',
		overview: '',
		date: ''
	},
	watched: true,
	ratings: defaultMovieRatings
}

export default UserMovie