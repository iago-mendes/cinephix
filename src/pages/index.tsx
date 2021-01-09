import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'
import {FaSearch} from 'react-icons/fa'

import Container from '../styles/pages/index'
import api from '../services/api'
import MediaCard, {Media} from '../components/MediaCard'
import CelebrityCard, {Celebrity} from '../components/CelebrityCard'

import logo from '../assets/logo-name-shadow.svg'
import glasses from '../assets/vector-icons/3d-glasses.svg'
import camera from '../assets/vector-icons/camera.svg'
import film from '../assets/vector-icons/film.svg'
import marker from '../assets/vector-icons/marker.svg'
import microfone from '../assets/vector-icons/microfone.svg'
import popcorn from '../assets/vector-icons/popcorn.svg'

interface HomeProps
{
	staticHome: Array<Media | Celebrity>
}

const Home: React.FC<HomeProps> = ({staticHome}) =>
{
	const [home, setHome] = useState<Array<Media | Celebrity>>(staticHome)
	const [search, setSearch] = useState('')
	const {data, error} = useSWR(`/api/getHome?search=${search}`)

	useEffect(() =>
	{
		if (search === '' || error)
		{
			setHome(staticHome)

			if (error)
				console.log('[error]', error)
		}
		else if (data && data.home)
			setHome(data.home)
	}, [data, error, search, staticHome])

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
			<Head>
				<title>Home</title>
			</Head>

			<header>
				<div className="icons left">
					<img src={camera} alt="Camera"/>
					<img src={glasses} alt="Glasses"/>
					<img src={film} alt="Film"/>
				</div>
				<img src={logo} alt="Cinephix" className='logo' />
				<div className="icons right">
					<img src={marker} alt="Marker"/>
					<img src={popcorn} alt="Popcorn"/>
					<img src={microfone} alt="Microfone"/>
				</div>
				<div className="search">
					<FaSearch size={25} />
					<input
						type="text"
						placeholder='Search for a movie, tv show or celebrity'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
			</header>

			{
				!data && search !== ''
				? <h1>Loading...</h1>
				: home.length === 0 && search !== ''
					? (
						<div className="noResults">
							<h1>No results found!</h1>
						</div>
					)
					: (
						<main>
							{home.map(item =>
							{
								if (isMedia(item))
									return (
										<MediaCard media={item} showOverview key={item.id} />
									)
								else if (isCelebrity(item))
									return (
										<CelebrityCard celebrity={item} showKnownFor key={item.id} />
									)
							})}
						</main>
				)}
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {data}:{data: Array<Media | Celebrity>} = await api.get('/home')

	return {
		props: {staticHome: data},
		revalidate: 5
	}
}

export default Home