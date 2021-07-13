import Ratings, {defaultTvshowRatings} from './ratings'
import TvshowDetails, {defaultTvshow} from './tvshow'

export interface UserTvshowListed {
	id: number
	title: string
	image: string
	venue?: string
	ratings: Ratings
}

export const defaultUserTvshowListed: UserTvshowListed = {
	id: 0,
	image: '',
	title: '',
	venue: '',
	ratings: defaultTvshowRatings
}

export const loadingUserTvshowListed: UserTvshowListed = {
	id: -1,
	image: '',
	title: '',
	venue: '',
	ratings: defaultTvshowRatings
}

export interface UserTvshowDetails {
	data: TvshowDetails
	status: string
	venue: string
	ratings: Ratings
}

export const defaultUserTvshowDetails: UserTvshowDetails = {
	data: defaultTvshow,
	status: '',
	venue: '',
	ratings: defaultTvshowRatings
}
