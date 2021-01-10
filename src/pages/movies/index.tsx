import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'
import {FaSearch} from 'react-icons/fa'

import Container from '../../styles/pages/movies/index'
import api from '../../services/api'
import MediaCard, {Media} from '../../components/MediaCard'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'

interface MoviesProps
{
	staticMovies: Media[]
}

const Movies: React.FC<MoviesProps> = ({staticMovies}) =>
{
	const [movies, setMovies] = useState<Media[]>(staticMovies)

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const {data, error} = useSWR(`/api/getMovies?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data)
		{
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)

			if (search === '' && page === 1)
				setMovies(staticMovies)
			else
				setMovies(data.movies)
		}
		else if (error)
		{
			setMovies(staticMovies)
			setPage(1)
			setTotalPages(1)

			console.error(error)
		}
	}, [data, error])

	return (
		<Container>
			<Head>
				<title>Movies</title>
			</Head>

			<header>
				<SearchBox search={search} setSearch={setSearch} display='Search for a movie' />
			</header>

			{
				!data && search !== '' && page !== 1
				? <h1>Loading...</h1>
				: Movies.length === 0 && search !== ''
					? (
						<div className="noResults">
							<h1>No results found!</h1>
						</div>
					)
					: (
						<GridPaginate page={page} setPage={setPage} totalPages={totalPages} >
							{movies.map(item => (
								<MediaCard media={item} showOverview key={item.id} />
							))}
						</GridPaginate>
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