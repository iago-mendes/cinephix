import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

import Container from '../../styles/pages/movies/[movie]'
import api from '../../services/api'
import {Media} from '../../components/MediaCard'
import Loading from '../../components/Loading'

interface MovieDetails
{
	id: number
  title: string
  image: string
  overview: string
  status: string
  date: string
  rating: number
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

	useEffect(() => console.log('[movie]', movie), [movie])

	if (Router.isFallback)
		return <Loading />

	return (
		<Container>
			<Head>
				<title>Movie</title>
			</Head>
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