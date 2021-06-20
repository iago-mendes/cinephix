import Ratings, {defaultTvshowRatings} from './ratings'
import TvshowDetails, { defaultTvshow } from './tvshow'

export interface UserTvshowListed
{
	id: number
	title: string
	image: string
	venue?: string
	ratings: Ratings
}

export const defaultUserTvshowListed: UserTvshowListed =
{
	id: 0,
	image: '',
	title: '',
	venue: '',
	ratings: defaultTvshowRatings
}

export const loadingUserTvshowListed: UserTvshowListed =
{
	id: -1,
	image: '',
	title: '',
	venue: '',
	ratings: defaultTvshowRatings
}

export const statusInfo: {[statusKey: string]: string} =
{
	watchList: 'This status is dedicated to TV shows you want to watch but haven\'t done it yet.',
	watching: 'This status is dedicated to TV shows you are currently watching.',
	waiting: 'This status is dedicated to TV shows you have already started watching but haven\'t finished. For example, if you are waiting for more seasons of a show, this is the right place to put it.',
	completed: 'This status is dedicated to TV shows you have already finished watching and there are no more seasons in production (this applies to cancelled shows as well).',
	stopped: 'This status is dedicated to TV shows you have already started watching but stopped before the end of it. This could be because you got bored, the series quality decreased, etc..',
	paused: 'This status is dedicated to TV shows you have already started watching, stopped before its end, AND you plan on finishing it some day.'
}

export interface UserTvshowDetails
{
	data: TvshowDetails
	status: string
	venue: string
	ratings: Ratings
}

export const defaultUserTvshowDetails: UserTvshowDetails =
{
	data: defaultTvshow,
	status: '',
	venue: '',
	ratings: defaultTvshowRatings
}