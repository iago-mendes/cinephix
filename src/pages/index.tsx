import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect} from 'react'

import Container from '../styles/pages/index'
import api from '../services/api'

interface Media
{
	id: number
	image: string
	title: string
	overview: string
	date: string
}

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
	useEffect(() => console.log('[staticHome]', staticHome), [staticHome])

	return (
		<Container>
			<Head>
				<title>Home</title>
			</Head>
			<h1>Hello world!</h1>
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