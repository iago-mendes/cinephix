import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'

import api from '../../services/api'
import MediaCard, {Media} from '../../components/cards/Media'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import tv from '../../assets/backgrounds/tv.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import CardAd from '../../components/ads/Card'
import { updatePaginatedData } from '../../utils/updatePaginatedData'
import { useRouter } from 'next/router'

interface TvshowsProps
{
	staticTvshows: Media[]
}

const Tvshows: React.FC<TvshowsProps> = ({staticTvshows}) =>
{
	const {locale: language} = useRouter()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [tvshows, setTvshows] = useState<Media[]>(staticTvshows)

	const tvshowsWithAd = tvshows.length < 10
		? tvshows
		: [...tvshows.slice(0, 10), {...tvshows[9], id: -1}, ...tvshows.slice(10)]

	useEffect(() =>
	{
		updatePaginatedData(
			{
				route: 'tvshows',
				setData: setTvshows,
				setLoading,
				search,
				page,
				setPage,
				setTotalPages,
				defaultData: staticTvshows,
				language
			})
	}, [search, page])

	return (
		<div className='page' >
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
				{tvshowsWithAd.map((item, index) =>
				{
					if (item.id < 0)
						return (
							<CardAd key={index} />
						)
					return (
						<MediaCard
							media={item}
							showOverview
							key={index}
							link={`tvshows/${item.id}`}
						/>
					)
				})}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const language = ctx.locale
	const {data}:{data: Media[]} = await api.get('/tvshows', {params: {language}})

	return {
		props: {staticTvshows: data},
		revalidate: 5
	}
}

export default Tvshows