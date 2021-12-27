import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {FiCalendar, FiEdit3, FiInfo, FiPlus, FiStar} from 'react-icons/fi'
import {useEffect, useState} from 'react'
import {Trans, t} from '@lingui/macro'

import api from '../../services/api'
import {Media} from '../../components/_cards/Media'
import {Carousel} from '../../components/Carousel'
import {CarouselCard} from '../../components/_cards/Carousel'
import formatDate from '../../utils/formatDate'
import MovieDetails from '../../models/movie'
import {useAuth} from '../../hooks/useAuth'
import UserMovie, {defaultUserMovie} from '../../models/userMovie'
import {Venue} from '../../components/Venue'
import getTotalRating from '../../utils/getTotalRating'
import SEOHead from '../../components/SEOHead'
import {OptimizedImage} from '../../components/OptimizedImage'
import {DetailsPageLayout} from '../../components/_layouts/DetailsPage'
import truncateText from '../../utils/truncateText'

interface MovieProps {
	movie: MovieDetails
}

const Movie: React.FC<MovieProps> = ({movie}) => {
	const {isFallback, push} = useRouter()
	const {user} = useAuth()

	const [userMovie, setUserMovie] = useState<UserMovie>(defaultUserMovie)

	useEffect(() => {
		if (user && user.email && movie)
			api
				.get(`users/${user.email}/movies/${movie.id}`)
				.then(({data}: {data: UserMovie}) => setUserMovie(data))
				.catch(() => setUserMovie(defaultUserMovie))
	}, [user, movie])

	if (!movie) return null

	return (
		<DetailsPageLayout
			isLoading={isFallback}
			overviewLength={movie.overview.length}
			className="page"
		>
			<SEOHead
				title={`${movie.title} | Cinephix`}
				description={movie.overview}
				image={movie.image}
			/>

			<main>
				<OptimizedImage src={movie.image} alt={`${movie.title} image`} />
				<div className="info">
					<h1 className="title">{movie.title}</h1>
					<div className="details">
						<div className="detail">
							<FiCalendar size={30} />
							<span>{formatDate(movie.date)}</span>
						</div>
						<div className="detail">
							<FiInfo size={30} />
							<span>{movie.status}</span>
						</div>
						<div className="detail">
							<FiStar size={30} />
							<span>{movie.rating}</span>
						</div>
					</div>
					<p className="description">{movie.overview}</p>
					<ul className="tags">
						{movie.genres.map(genre => (
							<li key={genre.id}>{genre.name}</li>
						))}
					</ul>
				</div>
			</main>

			{movie.collection && (
				<div className="row collection">
					<div>
						<h1>{truncateText(movie.collection.name, 50)}</h1>
						<OptimizedImage
							src={movie.collection.image}
							alt={`${movie.collection.name} image`}
						/>
					</div>
				</div>
			)}

			<div className="row user">
				{user && userMovie !== defaultUserMovie ? (
					<>
						<div className="group">
							<label>
								<Trans>My status</Trans>
							</label>
							<span>{userMovie.watched ? t`Watched` : t`Watch list`}</span>
						</div>
						{userMovie.venue && (
							<div className="group">
								<label>
									<Trans>My venue</Trans>
								</label>
								<span>
									<Venue venue={userMovie.venue} />
								</span>
							</div>
						)}
						{Object.values(userMovie.ratings).length !== 0 && (
							<div className="group">
								<label>
									<Trans>My rating</Trans>
								</label>
								<span>{getTotalRating(userMovie.ratings, true)}</span>
							</div>
						)}
						<button
							className="edit"
							title={t`Edit`}
							onClick={() => push(`/user/movies/${movie.id}/edit`)}
						>
							<FiEdit3 size={30} />
						</button>
					</>
				) : (
					<button
						className="add"
						onClick={() => push(`/user/movies/${movie.id}/add`)}
					>
						<FiPlus size={30} />
						<span>
							<Trans>Add to your movies</Trans>
						</span>
					</button>
				)}
			</div>

			<div className="row carousel">
				<span>
					<Trans>Cast</Trans> ({movie.credits.cast.length})
				</span>
				<Carousel numberOfItems={movie.credits.cast.length}>
					{movie.credits.cast.map(celebrity => (
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
					<Trans>Crew</Trans> ({movie.credits.crew.length})
				</span>
				<Carousel numberOfItems={movie.credits.crew.length}>
					{movie.credits.crew.map(celebrity => (
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
	const {data: movies}: {data: Media[]} = await api.get('movies')

	const paths = movies.map(movie => ({
		params: {movie: String(movie.id)}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx => {
	const {movie: id} = ctx.params
	const language = ctx.locale

	const {data: movie}: {data: MovieDetails} = await api.get(`movies/${id}`, {
		params: {language}
	})

	return {
		props: {movie},
		revalidate: 60
	}
}

export default Movie
