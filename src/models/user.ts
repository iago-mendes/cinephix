import Ratings from './ratings'

interface User
{
  _id: string
  email: string
  joinedAt: string
	movies: Array<
	{
		_id: string
		movieId: number
		watched: boolean
		venue: string
		ratings: Ratings
	}>
  tvshows: Array<
	{
		_id: string
		tvshowId: number
		status: string
		venue: string
		ratings: Ratings
	}>
  tvshowStatus: any
}

export const defaultUser: User =
{
	_id: '',
	email: '',
	joinedAt: '2021-01-01T00:00:00.000Z',
	movies: [],
	tvshows: [],
	tvshowStatus: {}
}

export default User