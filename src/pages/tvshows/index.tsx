import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'
import useSWR from 'swr'

import api from '../../services/api'
import MediaCard, {Media} from '../../components/cards/Media'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import tv from '../../assets/backgrounds/tv.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'

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
		if (search !== '')
			setTotalPages(1)
	}, [search])

	return (
		<div>
			<SEOHead
				title='TV Shows | Cinephix'
			/>

			<HeaderWithBackground background={tv} display='TV Shows' >
				<SearchBox search={search} setSearch={setSearch} display='Search for a TV show' />
			</HeaderWithBackground>

			<GridPaginate
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
				noResults={tvshows.length === 0}
			>
				{tvshows.map(item => (
					<MediaCard media={item} showOverview key={item.id} type='tvshow' />
				))}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () =>
{
	const {data}:{data: Media[]} = await api.get('/tvshows')

	return {
		props: {staticTvshows: data},
		revalidate: 5
	}
}

export default Tvshows