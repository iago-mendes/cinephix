import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'

import api from '../../services/api'
import MediaCard, {Media} from '../../components/cards/Media'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import cinema from '../../assets/backgrounds/cinema.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import CardAd from '../../components/ads/Card'
import { updatePaginatedData } from '../../utils/updatePaginatedData'
import { useRouter } from 'next/router'

interface MoviesProps
{
	staticMovies: Media[]
}

const Movies: React.FC<MoviesProps> = ({staticMovies}) =>
{
	const {locale: language} = useRouter()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [movies, setMovies] = useState<Media[]>(staticMovies)

	const moviesWithAd = movies.length < 10
		? movies
		: [...movies.slice(0, 10), {...movies[9], id: -1}, ...movies.slice(10)]

	useEffect(() =>
	{
		updatePaginatedData(
			{
				route: 'movies',
				setData: setMovies,
				setLoading,
				search,
				page,
				setPage,
				setTotalPages,
				defaultData: staticMovies,
				language
			})
	}, [search, page])

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
				{moviesWithAd.map((item, index) =>
				{
					if (item.id < 0)
						return (
							<CardAd key={index} />
						)
					else
						return (
							<MediaCard
								media={item}
								showOverview
								key={index}
								link={`movies/${item.id}`}
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
	const {data}:{data: Media[]} = await api.get('/movies', {params: {language}})

	return {
		props: {staticMovies: data},
		revalidate: 5
	}
}

export default Movies