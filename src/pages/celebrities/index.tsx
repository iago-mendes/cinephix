import {GetStaticProps} from 'next'
import {useState} from 'react'
import {t} from '@lingui/macro'

import api from '../../services/api'
import {Celebrity, CelebrityCard} from '../../components/_cards/Celebrity'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import actors from '../../assets/images/backgrounds/actors.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import CardAd from '../../components/_ads/Card'
import {usePaginatedData} from '../../hooks/usePaginatedData'
import {useRouter} from 'next/router'

interface CelebritiesProps {
	staticCelebrities: Celebrity[]
}

const Celebrities: React.FC<CelebritiesProps> = ({staticCelebrities}) => {
	const {locale: language} = useRouter()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)

	const [celebrities, setCelebrities] = useState<Celebrity[]>(staticCelebrities)

	const celebritiesWithAd =
		celebrities.length < 10
			? celebrities
			: [
					...celebrities.slice(0, 10),
					{...celebrities[9], id: -1},
					...celebrities.slice(10)
			  ]

	usePaginatedData({
		route: 'celebrities',
		setData: setCelebrities,
		setLoading,
		search,
		page,
		setPage,
		setTotalPages,
		defaultData: staticCelebrities,
		language
	})

	return (
		<div className="page">
			<SEOHead title={t`Celebrities` + ' | Cinephix'} />

			<HeaderWithBackground background={actors} display={t`Celebrities`}>
				<SearchBox
					search={search}
					setSearch={setSearch}
					display={t`Search for a celebrity`}
				/>
			</HeaderWithBackground>

			<GridPaginate
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
				noResults={celebrities.length === 0}
			>
				{celebritiesWithAd.map(celebrity => {
					if (celebrity.id < 0) return <CardAd key={celebrity.id} />
					return (
						<CelebrityCard
							celebrity={celebrity}
							showKnownFor
							key={celebrity.id}
						/>
					)
				})}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async ctx => {
	const language = ctx.locale

	const {data}: {data: Celebrity[]} = await api.get('/celebrities', {
		params: {language}
	})

	return {
		props: {staticCelebrities: data},
		revalidate: 5
	}
}

export default Celebrities
