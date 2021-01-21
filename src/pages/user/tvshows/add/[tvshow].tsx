import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {FormEvent} from 'react'

import Container from '../../../../styles/pages/user/tvshows/add/[tvshow]'
import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import {TvshowDetails} from '../../../tvshows/[tvshow]'
import Image from 'next/image'
import Loading from '../../../../components/Loading'

interface AddTvshowProps
{
	tvshow: TvshowDetails
}

const AddTvshow: React.FC<AddTvshowProps> = ({tvshow}) =>
{
	function handleSubmit(e: FormEvent)
	{
		e.preventDefault()
	}

	if (!tvshow)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<Container>
			<Head>
				<title>Add Tvshow</title>
			</Head>

			<div className='img'>
				<Image src={tvshow.image} width={780} height={1170} layout='responsive'/>
			</div>
			<div className='info'>
				<h1>{tvshow.title}</h1>
				<form onSubmit={handleSubmit} >

				</form>
			</div>
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async ctx =>
{
	const {data: tvshows}:{data: Media[]} = await api.get('tvshows')

	const paths = tvshows.map(tvshow => (
	{
		params: {tvshow: String(tvshow.id)}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {tvshow: id} = ctx.params

	const {data: tvshow}:{data: TvshowDetails} = await api.get(`tvshows/${id}`)

	return {
		props: {tvshow},
		revalidate: 60
	}
}

export default AddTvshow