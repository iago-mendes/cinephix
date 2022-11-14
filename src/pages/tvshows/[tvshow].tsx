import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {
	FiCalendar,
	FiInfo,
	FiStar,
	FiArrowRight,
	FiPlus,
	FiEdit3
} from 'react-icons/fi'
import {Trans, t} from '@lingui/macro'

import api from '../../services/api'
import {Media} from '../../components/_cards/Media'
import {Carousel} from '../../components/Carousel'
import {CarouselCard} from '../../components/_cards/Carousel'
import formatDate from '../../utils/formatDate'
import React, {useEffect, useState} from 'react'
import {useAuth} from '../../hooks/useAuth'
import {
	UserTvshowDetails,
	defaultUserTvshowDetails
} from '../../models/userTvshow'
import getTotalRating from '../../utils/getTotalRating'
import getStatusLabel from '../../utils/getStatusLabel'
import {Venue} from '../../components/Venue'
import SEOHead from '../../components/SEOHead'
import {DetailsPageLayout} from '../../components/_layouts/DetailsPage'
import {OptimizedImage} from '../../components/OptimizedImage'

export interface TvshowDetails {
	id: number
	image: string
	title: string
	startDate: string
	endDate: string
	status: string
	inProduction: boolean
	rating: number
	seasonsNumber: number
	episodesNumber: number
	overview: string
	genres: Array<{
		id: number
		name: string
	}>
	credits: {
		cast: Array<{
			id: number
			name: string
			image: string
			character: string
		}>
		crew: Array<{
			id: number
			name: string
			image: string
			department: string
		}>
	}
}

interface TvshowProps {
	tvshow: TvshowDetails
}

const Tvshow: React.FC<TvshowProps> = ({tvshow}) => {
	const {isFallback, push, locale} = useRouter()
	const {user} = useAuth()

	const [userTvshow, setUserTvshow] = useState<UserTvshowDetails>(
		defaultUserTvshowDetails
	)

	useEffect(() => {
		if (user && user.email && tvshow)
			api
				.get(`users/${user.email}/tvshows/${tvshow.id}`)
				.then(({data}: {data: UserTvshowDetails}) => setUserTvshow(data))
				.catch(() => setUserTvshow(defaultUserTvshowDetails))
	}, [user, tvshow])

	if (!tvshow) return null

	return (
		<DetailsPageLayout
			isLoading={isFallback}
			overviewLength={tvshow.overview.length}
			className="page"
		>
			<SEOHead
				title={`${tvshow.title} | Cinephix`}
				description={tvshow.overview}
				image={tvshow.image}
			/>

			<main>
				<OptimizedImage src={tvshow.image} alt={`${tvshow.title} image`} />
				<div className="info">
					<h1 className="title">{tvshow.title}</h1>
					<div className="details">
						<div className="detail dates">
							<FiCalendar />
							<span>{formatDate(tvshow.startDate, locale)}</span>
							<FiArrowRight />
							<span>{formatDate(tvshow.endDate, locale)}</span>
						</div>
						<div className="group">
							<div className="detail">
								<FiInfo />
								<span>{tvshow.status}</span>
							</div>
							<div className="detail">
								<FiStar />
								<span>{tvshow.rating}</span>
							</div>
						</div>
						<div className="group">
							<div className="detail">
								<strong>
									<Trans>Nº of seasons:</Trans>
								</strong>
								<span>{tvshow.seasonsNumber}</span>
							</div>
							<div className="detail">
								<strong>
									<Trans>Nº of episodes:</Trans>
								</strong>
								<span>{tvshow.episodesNumber}</span>
							</div>
						</div>
					</div>
					<p className="description">{tvshow.overview}</p>
					<ul className="tags">
						{tvshow.genres.map(genre => (
							<li key={genre.id}>{genre.name}</li>
						))}
					</ul>
				</div>
			</main>

			<div className="row user">
				{user && userTvshow !== defaultUserTvshowDetails ? (
					<>
						<div className="group">
							<label>
								<Trans>My status</Trans>
							</label>
							<span>{getStatusLabel(userTvshow.status)}</span>
						</div>
						{userTvshow.venue && (
							<div className="group">
								<label>
									<Trans>My venue</Trans>
								</label>
								<span>
									<Venue venue={userTvshow.venue} />
								</span>
							</div>
						)}
						{Object.values(userTvshow.ratings).length !== 0 && (
							<div className="group">
								<label>
									<Trans>My rating</Trans>
								</label>
								<span>{getTotalRating(userTvshow.ratings, true)}</span>
							</div>
						)}
						<button
							className="edit"
							title={t`Edit`}
							onClick={() => push(`/user/tvshows/${tvshow.id}/edit`)}
						>
							<FiEdit3 size={30} />
						</button>
					</>
				) : (
					<button
						className="add"
						onClick={() => push(`/user/tvshows/${tvshow.id}/add`)}
					>
						<FiPlus size={30} />
						<span>
							<Trans>Add to your TV shows</Trans>
						</span>
					</button>
				)}
			</div>

			<div className="row carousel">
				<span>
					<Trans>Cast</Trans> ({tvshow.credits.cast.length})
				</span>
				<Carousel numberOfItems={tvshow.credits.cast.length}>
					{tvshow.credits.cast.map(celebrity => (
						<CarouselCard
							key={celebrity.id}
							image={celebrity.image}
							primaryDisplay={celebrity.name}
							secondaryDisplay={celebrity.character}
							link={`/celebrities/${celebrity.id}`}
						/>
					))}
				</Carousel>
			</div>

			<div className="row carousel">
				<span>
					<Trans>Crew</Trans> ({tvshow.credits.crew.length})
				</span>
				<Carousel numberOfItems={tvshow.credits.crew.length}>
					{tvshow.credits.crew.map(celebrity => (
						<CarouselCard
							key={celebrity.id}
							image={celebrity.image}
							primaryDisplay={celebrity.name}
							secondaryDisplay={celebrity.department}
							link={`/celebrities/${celebrity.id}`}
						/>
					))}
				</Carousel>
			</div>
		</DetailsPageLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {data: tvshows}: {data: Media[]} = await api.get('tvshows')

	const paths = tvshows.map(tvshow => ({
		params: {tvshow: String(tvshow.id)}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx => {
	const {tvshow: id} = ctx.params
	const language = ctx.locale

	const {data: tvshow}: {data: TvshowDetails} = await api.get(`tvshows/${id}`, {
		params: {language}
	})

	return {
		props: {tvshow},
		revalidate: 60
	}
}

export default Tvshow
