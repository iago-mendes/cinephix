import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'

import api from '../../services/api'
import CelebrityCard, {Celebrity} from '../../components/cards/Celebrity'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import actors from '../../assets/backgrounds/actors.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import CardAd from '../../components/ads/Card'
import { updatePaginatedData } from '../../utils/updatePaginatedData'

interface CelebritiesProps
{
	staticCelebrities: Celebrity[]
}

const Celebrities: React.FC<CelebritiesProps> = ({staticCelebrities}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [celebrities, setCelebrities] = useState<Celebrity[]>(staticCelebrities)

	useEffect(() =>
	{
		updatePaginatedData(
			{
				route: 'celebrities',
				setData: setCelebrities,
				setLoading,
				search,
				page,
				setPage,
				setTotalPages,
				defaultData: staticCelebrities
			})
	}, [search, page])

	return (
		<div className='page' >
			<SEOHead
				title='Celebrities | Cinephix'
			/>

			<HeaderWithBackground background={actors} display='Celebrities' >
				<SearchBox search={search} setSearch={setSearch} display='Search for a celebrity' />
			</HeaderWithBackground>

			<GridPaginate
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
				noResults={celebrities.length === 0}
			>
				{celebrities.map((celebrity, index) => (
					<>
						<CelebrityCard
							celebrity={celebrity}
							showKnownFor
							key={celebrity.id}
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
	const {data}:{data: Celebrity[]} = await api.get('/celebrities')

	return {
		props: {staticCelebrities: data},
		revalidate: 5
	}
}

export default Celebrities