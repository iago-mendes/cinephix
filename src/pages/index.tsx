import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'

import Container from '../styles/pages/index'
import api from '../services/api'
import MediaCard, {Media} from '../components/MediaCard'

interface Celebrity
{
	id: number
	image: string
	name: string
	knownForDepartment: string
	knownFor: Media[]
}

interface HomeProps
{
	staticHome: Array<Media | Celebrity>
}

const Home: React.FC<HomeProps> = ({staticHome}) =>
{
	const [home, setHome] = useState<Array<Media | Celebrity>>(staticHome)

	function isMedia(item: Media | Celebrity): item is Media
	{
    return 'title' in item
	}

	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			{home.map(item =>
			{
				if (isMedia(item))
					return (
						<MediaCard media={item} showOverview key={item.id} />
					)
			})}
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