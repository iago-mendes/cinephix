import TvshowDetails, { defaultTvshow } from './tvshow'
import Ratings, {defaultTvshowRatings} from './ratings'

interface UserTvshow
{
	data: TvshowDetails
	status: string
	venue?: string
	ratings: Ratings
}

export const defaultUserTvshow: UserTvshow =
{
	data: defaultTvshow,
	status: '',
	ratings: defaultTvshowRatings
}

export default UserTvshow