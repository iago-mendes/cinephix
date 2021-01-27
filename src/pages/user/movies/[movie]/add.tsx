import {GetStaticPaths, GetStaticProps} from 'next'

import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import MovieDetails from '../../../../models/movie'
import Loading from '../../../../components/Loading'
import MovieForm from '../../../../components/forms/Movie'

interface AddMovieProps
{
	movie: MovieDetails
}

const AddMovie: React.FC<AddMovieProps> = ({movie}) =>
{
	if (!movie)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<div>
			<MovieForm
				movie={movie}
				method='post'
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

export default AddMovie