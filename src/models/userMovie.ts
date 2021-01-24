import Ratings from './ratings'

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