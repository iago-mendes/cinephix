import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'
import {FaSearch} from 'react-icons/fa'

import Container from '../../styles/pages/movies/index'
import api from '../../services/api'
import MediaCard, {Media} from '../../components/MediaCard'

interface MoviesProps
{
	staticMovies: Media[]
}

const Movies: React.FC<MoviesProps> = ({staticMovies}) =>
{
	const [movies, setMovies] = useState<Media[]>(staticMovies)
	const [search, setSearch] = useState('')
	const {data, error} = useSWR(`/api/getMovies?search=${search}`)

	useEffect(() =>
	{
		if (search === '' || error)
		{
			setMovies(staticMovies)

			if (error)
				console.log('[error]', error)
		}
		else if (data && data.Movies)
			setMovies(data.Movies)
	}, [data, error, search, staticMovies])

	return (
		<Container>
			<Head>
				<title>Movies</title>
			</Head>

			<header>
				<div className="search">
					<FaSearch size={25} />
					<input
						type="text"
						placeholder='Search for a movie'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
			</header>

			{
				!data && search !== ''
				? <h1>Loading...</h1>
				: Movies.length === 0 && search !== ''
					? (
						<div className="noResults">
							<h1>No results found!</h1>
						</div>
					)
					: (
						<main>
							{movies.map(item => (
								<MediaCard media={item} showOverview key={item.id} />
							))}
						</main>
					)
			}
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {data}:{data: Media[]} = await api.get('/movies')

	return {
		props: {staticMovies: data},
		revalidate: 5
	}
}

export default Movies