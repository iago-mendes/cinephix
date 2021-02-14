import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {FiCalendar, FiEdit3, FiInfo, FiPlus, FiStar} from 'react-icons/fi'
import {SwiperSlide} from 'swiper/react'
import Image from 'next/image'
import {useEffect, useState} from 'react'

import Container from '../../styles/pages/movies/[movie]'
import api from '../../services/api'
import {Media} from '../../components/cards/Media'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import CarouselCard from '../../components/cards/Carousel'
import formatDate from '../../utils/formatDate'
import MovieDetails from '../../models/movie'
import useUser from '../../hooks/useUser'
import UserMovie, {defaultUserMovie} from '../../models/userMovie'
import getVenue from '../../utils/getVenue'
import getTotalRating from '../../utils/getTotalRating'
import SEOHead from '../../components/SEOHead'

interface MovieProps
{
	movie: MovieDetails
}

const Movie: React.FC<MovieProps> = ({movie}) =>
{
	const router = useRouter()
	const {user} = useUser()

	const [userMovie, setUserMovie] = useState<UserMovie>(defaultUserMovie)

	useEffect(() =>
	{
		if (user && user.email && movie)
			api.get(`users/${user.email}/movies/${movie.id}`)
				.then(({data}:{data: UserMovie}) => setUserMovie(data))
				.catch(() => setUserMovie(defaultUserMovie))
	}, [user, movie])

	if (router.isFallback)
		return <Loading style={{height: 'calc(100vh - 5rem)'}} />

	return (
		<Container>
			<SEOHead
				title={`${movie.title} | Cinephix`}
				description={movie.overview}
				image={movie.image}
			/>

			<main>
				<div className='img'>
					<Image src={movie.image} width={780} height={1170} layout='responsive'/>
				</div>
				<div className='info'>
					<h1>{movie.title}</h1>
					<div className='details'>
						<div className='detail'>
							<FiCalendar size={30} />
							<span>{formatDate(movie.date)}</span>
						</div>
						<div className='detail'>
							<FiInfo size={30} />
							<span>{movie.status}</span>
						</div>
						<div className='detail'>
							<FiStar size={30} />
							<span>{movie.rating}</span>
						</div>
					</div>
					<p>{movie.overview}</p>
					<ul>
						{movie.genres.map(genre => (
							<li key={genre.id} >
								{genre.name}
							</li>
						))}
					</ul>
				</div>
			</main>

			{movie.collection && (
				<div className='collection'>
					<div className='main'>
						<h1>{movie.collection.name}</h1>
						<div className='img'>
							<Image src={movie.collection.image} width={780} height={1170} layout='responsive' />
						</div>
					</div>
				</div>
			)}

			<div className='row userMovie'>
				{
					(user && userMovie !== defaultUserMovie)
						? (
							<>
								<div className='group'>
									<label>My status</label>
									<span>{userMovie.watched ? 'Watched' : 'Watch list'}</span>
								</div>
								{
									userMovie.venue && (
										<div className='group'>
											<label>My venue</label>
											<span>{getVenue(userMovie.venue)}</span>
										</div>
									)
								}
								{
									Object.values(userMovie.ratings).length !== 0 && (
										<div className='group'>
											<label>My rating</label>
											<span>{getTotalRating(userMovie.ratings, true)}</span>
										</div>
									)
								}
								<button className='edit' title='Edit' onClick={() => router.push(`/user/movies/${movie.id}/edit`)} >
									<FiEdit3 size={30} />
								</button>
							</>
						)
						: (
							<button className='add' onClick={() => router.push(`/user/movies/${movie.id}/add`)} >
								<FiPlus size={30} />
								<span>Add to your movies</span>
							</button>
						)
				}
			</div>

			<div className='row carousel'>
				<span>Cast ({movie.credits.cast.length})</span>
				<Carousel>
					{movie.credits.cast.map((celebrity, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={celebrity.image}
								primaryDisplay={celebrity.name}
								secondaryDisplay={celebrity.character}
								link={`/celebrities/${celebrity.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>

			<div className='row carousel'>
				<span>Crew ({movie.credits.crew.length})</span>
				<Carousel>
					{movie.credits.crew.map((celebrity, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={celebrity.image}
								primaryDisplay={celebrity.name}
								secondaryDisplay={celebrity.department}
								link={`/celebrities/${celebrity.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>
{
	const {data: movies}:{data: Media[]} = await api.get('movies')

	const paths = movies.map(movie => (
		{
			params: {movie: String(movie.id)}
		}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {movie: id} = ctx.params

	const {data: movie}:{data: MovieDetails} = await api.get(`movies/${id}`)

	return {
		props: {movie},
		revalidate: 60
	}
}

export default Movie