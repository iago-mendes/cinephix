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
				defaultData: staticTvshows
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
				{tvshows.map((item, index) => (
					<>
						<MediaCard
							media={item}
							showOverview
							key={item.id}
							link={`tvshows/${item.id}`}
						/>
						{index === 9 && (
							<CardAd key='ad' />
						)}
					</>
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