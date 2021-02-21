import Ratings, {defaultTvshowRatings} from './ratings'

interface UserTvshow
{
	id: number
	title: string
	image: string
	venue?: string
	ratings: Ratings
}

export const defaultUserTvshow: UserTvshow =
{
	id: 0,
	image: '',
	title: '',
	venue: '',
	ratings: defaultTvshowRatings
}

export const statusInfo: {[statusKey: string]: string} =
{
	watchList: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.',
	watching: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.',
	waiting: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.',
	completed: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.',
	stopped: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.',
	paused: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam est, fermentum ut felis vel, dictum iaculis augue.'
}

export default UserTvshow