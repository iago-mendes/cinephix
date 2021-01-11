import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {FiCalendar, FiInfo, FiStar} from 'react-icons/fi'
import {SwiperSlide} from 'swiper/react'
import Image from 'next/image'

import Container from '../../styles/pages/movies/[movie]'
import api from '../../services/api'
import {Media} from '../../components/MediaCard'
import Loading from '../../components/Loading'
import Carousel, {CarouselCard} from '../../components/Carousel'

interface MovieDetails
{
	id: number
  image: string
  title: string
  date: string
  status: string
  rating: number
  overview: string
	collection?:
	{
    id: number
    name: string
    image: string
  }
  genres: Array<
	{
		id: number
		name: string
	}>
	credits:
	{
		cast: Array<
		{
			id: number
			name: string
			image: string
			character: string
		}>
		crew: Array<
		{
			id: number
			name: string
			image: string
			department: string
		}>
	}
}

interface MovieProps
{
	movie: MovieDetails
}

const Movie: React.FC<MovieProps> = ({movie}) =>
{
	const Router = useRouter()

	if (Router.isFallback)
		return <Loading />

	return (
		<Container>
			<Head>
				<title>Movie</title>
			</Head>

			<main>
				<div className='img'>
					<Image src={movie.image} width={780} height={1170} layout='responsive'/>
				</div>
				<div className='info'>
					<h1>{movie.title}</h1>
					<div className='details'>
						<div className='detail'>
							<FiCalendar size={30} />
							<span>{movie.date}</span>
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
					<h1>Collection</h1>
					<div className='main'>
						<h2>{movie.collection.name}</h2>
						<div className='img'>
							<Image src={movie.collection.image} width={780} height={1170} layout='responsive' />
						</div>
					</div>
				</div>
			)}

			<div className='cast'>
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

			<div className='crew'>
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

export const getStaticPaths: GetStaticPaths = async ctx =>
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