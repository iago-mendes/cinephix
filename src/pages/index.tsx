import {GetStaticProps} from 'next'
import {useState} from 'react'
import Image from 'next/legacy/image'
import {t} from '@lingui/macro'

import logoName from '../assets/images/logo/name.svg'
import logoIcon from '../assets/images/logo/icon.svg'
import glasses from '../assets/images/vector-icons/3d-glasses.svg'
import camera from '../assets/images/vector-icons/camera.svg'
import film from '../assets/images/vector-icons/film.svg'
import marker from '../assets/images/vector-icons/marker.svg'
import microfone from '../assets/images/vector-icons/microfone.svg'
import popcorn from '../assets/images/vector-icons/popcorn.svg'

import Container from '../styles/pages/index'
import api from '../services/api'
import {Media, MediaCard} from '../components/_cards/Media'
import {Celebrity, CelebrityCard} from '../components/_cards/Celebrity'
import SearchBox from '../components/SearchBox'
import GridPaginate from '../components/GridPaginate'
import SEOHead from '../components/SEOHead'
import CardAd from '../components/_ads/Card'
import {usePaginatedData} from '../hooks/usePaginatedData'
import {useRouter} from 'next/router'

interface HomeProps {
	staticHome: Array<Media | Celebrity>
}

const Home: React.FC<HomeProps> = ({staticHome}) => {
	const {locale: language} = useRouter()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)

	const [home, setHome] = useState<Array<Media | Celebrity>>(staticHome)

	const homeWithAd =
		home.length < 10
			? home
			: [...home.slice(0, 10), {...home[9], id: -1}, ...home.slice(10)]

	usePaginatedData({
		route: 'home',
		setData: setHome,
		setLoading,
		search,
		page,
		setPage,
		setTotalPages,
		defaultData: staticHome,
		language
	})

	function isMedia(item: Media | Celebrity): item is Media {
		return 'title' in item
	}

	function isCelebrity(item: Celebrity | Celebrity): item is Celebrity {
		return 'name' in item
	}

	return (
		<Container className="page">
			<SEOHead />

			<header>
				<div className="left icons">
					<div className="img">
						<Image
							src={camera}
							alt="Camera"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
					<div className="img">
						<Image
							src={glasses}
							alt="Glasses"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
					<div className="img">
						<Image
							src={film}
							alt="Film"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
				</div>
				<div className="logos">
					<div className="icon">
						<Image
							src={logoIcon}
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
					<div className="name">
						<Image
							src={logoName}
							width={1000}
							height={200}
							layout="responsive"
						/>
					</div>
				</div>
				<div className="right icons">
					<div className="img">
						<Image
							src={marker}
							alt="Marker"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
					<div className="img">
						<Image
							src={popcorn}
							alt="Popcorn"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
					<div className="img">
						<Image
							src={microfone}
							alt="Microfone"
							width={1000}
							height={1000}
							layout="responsive"
						/>
					</div>
				</div>
				<SearchBox
					search={search}
					setSearch={setSearch}
					display={t`Search for a movie, TV show, or celebrity`}
				/>
			</header>

			<GridPaginate
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
				noResults={home.length === 0}
			>
				{homeWithAd.map(item => {
					if (item.id < 0) return <CardAd key={item.id} />
					else if (isMedia(item))
						return (
							<MediaCard
								media={item}
								showOverview
								key={item.id}
								link={`/${item.type}s/${item.id}`}
							/>
						)
					else if (isCelebrity(item))
						return <CelebrityCard celebrity={item} showKnownFor key={item.id} />
				})}
			</GridPaginate>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async ctx => {
	const language = ctx.locale
	const {data}: {data: Array<Media | Celebrity>} = await api.get('/home', {
		params: {language}
	})

	return {
		props: {staticHome: data},
		revalidate: 5
	}
}

export default Home
