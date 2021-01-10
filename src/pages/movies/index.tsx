import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'
import Image from 'next/image'

import Container from '../../styles/pages/movies/index'
import api from '../../services/api'
import MediaCard, {Media} from '../../components/MediaCard'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import cinema from '../../assets/backgrounds/cinema.png'

interface MoviesProps
{
	staticMovies: Media[]
}

const Movies: React.FC<MoviesProps> = ({staticMovies}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [movies, setMovies] = useState<Media[]>(staticMovies)
	const {data, error, revalidate} = useSWR(`/api/getMovies?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data)
		{
			setMovies(data.movies)
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)
		}
		else if (error)
		{
			setMovies(staticMovies)
			setPage(1)
			setTotalPages(1)

			console.error(error)
		}
	}, [data, error])

	useEffect(() =>
	{
		if (search === '' && page === 1)
			setMovies(staticMovies)
		else
		{
			revalidate()
			setLoading(true)
		}
	}, [search, page])

	useEffect(() =>
	{
		if (movies)
			setLoading(false)
	}, [movies])

	return (
		<Container>
			<Head>
				<title>Movies</title>
			</Head>

			<header>
				<div className='background'>
					<Image src={cinema} width={1500} height={1000} layout='responsive' quality={10} />
				</div>
				<h1>Movies</h1>
				<SearchBox search={search} setSearch={setSearch} display='Search for a movie' />
			</header>

			{
				movies.length === 0
				? (
					<div className='noResults'>
						<h1>No results were found!</h1>
					</div>
				)
				: (
					<GridPaginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} >
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