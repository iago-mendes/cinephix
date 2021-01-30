import {GetStaticProps} from 'next'
import {useEffect, useState} from 'react'
import useSWR from 'swr'

import Container from '../styles/pages/index'
import api from '../services/api'
import MediaCard, {Media} from '../components/MediaCard'
import CelebrityCard, {Celebrity} from '../components/CelebrityCard'
import SearchBox from '../components/SearchBox'
import GridPaginate from '../components/GridPaginate'

import logo from '../assets/logo/name.svg'
import glasses from '../assets/vector-icons/3d-glasses.svg'
import camera from '../assets/vector-icons/camera.svg'
import film from '../assets/vector-icons/film.svg'
import marker from '../assets/vector-icons/marker.svg'
import microfone from '../assets/vector-icons/microfone.svg'
import popcorn from '../assets/vector-icons/popcorn.svg'
import SEOHead from '../components/SEOHead'

interface HomeProps
{
	staticHome: Array<Media | Celebrity>
}

const Home: React.FC<HomeProps> = ({staticHome}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage]	= useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [home, setHome] = useState<Array<Media | Celebrity>>(staticHome)
	const {data, error, revalidate} = useSWR(`/api/getHome?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data)
		{
			setHome(data.home)
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)
		}
		else if (error)
		{
			setHome(staticHome)
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
			setHome(staticHome)
		}
		else
		{
			revalidate()
			setLoading(true)
		}
	}, [search, page])

	useEffect(() =>
	{
		if (home)
			setLoading(false)
	}, [home])

	useEffect(() =>
	{
		setPage(1)
		if (search !== '')
			setTotalPages(1)
	}, [search])

	function isMedia(item: Media | Celebrity): item is Media
	{
		return 'title' in item
	}

	function isCelebrity(item: Celebrity | Celebrity): item is Celebrity
	{
		return 'name' in item
	}

	return (
		<Container>
			<SEOHead />

			<header>
				<div className='icons left'>
					<img src={camera} alt='Camera'/>
					<img src={glasses} alt='Glasses'/>
					<img src={film} alt='Film'/>
				</div>
				<img src={logo} alt='Cinephix' className='logo' />
				<div className='icons right'>
					<img src={marker} alt='Marker'/>
					<img src={popcorn} alt='Popcorn'/>
					<img src={microfone} alt='Microfone'/>
				</div>
				<SearchBox search={search} setSearch={setSearch} display='Search for a movie, TV show, or celebrity' />
			</header>

			{
				home.length === 0 && search !== ''
					? (
						<div className='noResults'>
							<h1>No results found!</h1>
						</div>
					)
					: (
						<GridPaginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} >
							{home.map(item =>
							{
								if (isMedia(item))
									return (
										<MediaCard media={item} showOverview key={item.id} type={item.type} />
									)
								else if (isCelebrity(item))
									return (
										<CelebrityCard celebrity={item} showKnownFor key={item.id} />
									)
							})}
						</GridPaginate>
					)
			}
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async () =>
{
	const {data}:{data: Array<Media | Celebrity>} = await api.get('/home')

	return {
		props: {staticHome: data},
		revalidate: 5
	}
}

export default Home