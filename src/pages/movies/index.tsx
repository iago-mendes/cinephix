import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'
import useSWR from 'swr'

import api from '../../services/api'
import MediaCard, {Media} from '../../components/cards/Media'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import cinema from '../../assets/backgrounds/cinema.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'

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
		{
			revalidate()
			setMovies(staticMovies)
		}
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

	useEffect(() =>
	{
		setPage(1)
		if (search !== '')
			setTotalPages(1)
	}, [search])

	return (
		<div className='page' >
			<SEOHead
				title='Movies | Cinephix'
			/>

			<HeaderWithBackground background={cinema} display='Movies' >
				<SearchBox search={search} setSearch={setSearch} display='Search for a movie' />
			</HeaderWithBackground>

			<GridPaginate
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
				noResults={movies.length === 0}
			>
				{movies.map(item => (
					<MediaCard
						media={item}
						showOverview
						key={item.id}
						link={`movies/${item.id}`}
					/>
				))}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () =>
{
	const {data}:{data: Media[]} = await api.get('/movies')

	return {
		props: {staticMovies: data},
		revalidate: 5
	}
}

export default Movies