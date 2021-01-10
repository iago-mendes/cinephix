import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'

import api from '../../services/api'
import MediaCard, {Media} from '../../components/MediaCard'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import netflix from '../../assets/backgrounds/netflix.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'

interface TvshowsProps
{
	staticTvshows: Media[]
}

const Tvshows: React.FC<TvshowsProps> = ({staticTvshows}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [tvshows, setTvshows] = useState<Media[]>(staticTvshows)
	const {data, error, revalidate} = useSWR(`/api/getTvshows?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data)
		{
			setTvshows(data.tvshows)
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)
		}
		else if (error)
		{
			setTvshows(staticTvshows)
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
			setTvshows(staticTvshows)
		}
		else
		{
			revalidate()
			setLoading(true)
		}
	}, [search, page])

	useEffect(() =>
	{
		if (tvshows)
			setLoading(false)
	}, [tvshows])

	useEffect(() =>
	{
		setPage(1)
		setTotalPages(1)
	}, [search])

	return (
		<div>
			<Head>
				<title>Tvshows</title>
			</Head>

			<HeaderWithBackground background={netflix} display='TV Shows' >
				<SearchBox search={search} setSearch={setSearch} display='Search for a TV show' />
			</HeaderWithBackground>

			{
				tvshows.length === 0
				? (
					<div className='noResults'>
						<h1>No results were found!</h1>
					</div>
				)
				: (
					<GridPaginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} >
						{tvshows.map(item => (
							<MediaCard media={item} showOverview key={item.id} />
						))}
					</GridPaginate>
				)
			}
		</div>
	)
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {data}:{data: Media[]} = await api.get('/tvshows')

	return {
		props: {staticTvshows: data},
		revalidate: 5
	}
}

export default Tvshows