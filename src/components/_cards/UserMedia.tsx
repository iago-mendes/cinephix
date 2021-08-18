import truncateText from '../../utils/truncateText'
import {CardContainer} from './Container'
import {UserMovieListed} from '../../models/userMovie'
import {UserTvshowListed} from '../../models/userTvshow'
import getTotalRating from '../../utils/getTotalRating'

type Media = UserTvshowListed | UserMovieListed

type Props = React.HTMLAttributes<HTMLDivElement> & {
	media: Media
}

export function UserMediaCard({media, ...props}: Props) {
	const mediaData = {
		image: isMovie(media) ? media.data.image : media.image,
		title: isMovie(media) ? media.data.title : media.title,
		ratings: media.ratings,
		venue: media.venue
	}

	const isLoading = isMovie(media) ? media.data.id < 0 : media.id < 0

	function isMovie(media: Media): media is UserMovieListed {
		return 'data' in media
	}

	return (
		<CardContainer
			imageSrc={mediaData.image}
			cardWidth={{mobile: '20rem', desktop: '30rem'}}
			isLoading={isLoading}
			{...props}
		>
			<span className="title">{truncateText(mediaData.title, 35)}</span>
			<div className="details">
				{Object.values(mediaData.ratings).length !== 0 &&
					getTotalRating(mediaData.ratings, true)}
				<span>{mediaData.venue}</span>
			</div>
		</CardContainer>
	)
}
