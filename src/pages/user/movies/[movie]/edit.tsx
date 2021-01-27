import {GetStaticPaths, GetStaticProps} from 'next'
import {useEffect, useState} from 'react'

import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import MovieDetails from '../../../../models/movie'
import Loading from '../../../../components/Loading'
import MovieForm from '../../../../components/forms/Movie'
import useUser from '../../../../hooks/useUser'
import UserMovie, { defaultUserMovie } from '../../../../models/userMovie'
import RemoveButton from '../../../../components/RemoveButton'

interface EditMovieProps
{
	movie: MovieDetails
}

const EditMovie: React.FC<EditMovieProps> = ({movie}) =>
{
	const {user} = useUser()

	const [userMovie, setUserMovie] = useState<UserMovie>(defaultUserMovie)
	const [removeRoute, setRemoveRoute] = useState('')

	useEffect(() =>
	{
		if (user && movie)
			api.get(`users/${user.email}/movies/${movie.id}`)
				.then(({data}:{data: UserMovie}) => setUserMovie(data))
	}, [user, movie])

	useEffect(() =>
	{
		if (user && userMovie)
			setRemoveRoute(`/users/${user.email}/movies/${userMovie.data.id}`)
	}, [user, userMovie])

	if (!movie)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<div
			style={{position: 'relative'}}
		>
			<RemoveButton
				title={movie.title}
				collection='movies'
				apiRoute={removeRoute}
			/>

			<MovieForm
				movie={movie}
				method='put'
				userMovie={userMovie}
			/>
		</div>
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

export default EditMovie