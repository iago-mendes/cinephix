import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {FormEvent, useState} from 'react'
import Select from 'react-select'

import Container from '../../../../styles/pages/user/tvshows/add/[tvshow]'
import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import {TvshowDetails} from '../../../tvshows/[tvshow]'
import Image from 'next/image'
import Loading from '../../../../components/Loading'
import {selectStyles} from '../../../../styles/global'

interface SelectOption
{
	label: string
	value: string
}

interface AddTvshowProps
{
	tvshow: TvshowDetails
}

const AddTvshow: React.FC<AddTvshowProps> = ({tvshow}) =>
{
	const [status, setStatus] = useState('')
	const [venue, setVenue] = useState('')

	const statusOptions: SelectOption[] = 
	[
		{label: 'Watch list', value: 'watchList'},
		{label: 'Watching', value: 'watching'},
		{label: 'Waiting', value: 'waiting'},
		{label: 'Completed', value: 'completed'},
		{label: 'Stopped', value: 'stopped'},
		{label: 'Paused', value: 'paused'}
	]

	const venueOptions: SelectOption[] =
	[
		{label: 'Netflix', value: 'Netflix'},
		{label: 'Prime Video', value: 'Prime Video'},
		{label: 'Disney+', value: 'Disney+'},
		{label: 'HBO Max', value: 'HBO Max'},
		{label: 'Movie Theater', value: 'Movie Theater'},
		{label: 'Other', value: 'Other'}
	]

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
					<div className='field'>
						<label htmlFor='status'>Status</label>
						<Select
							id='status'
							name='status'
							value={statusOptions.find(({value}) => value === status)}
							options={statusOptions}
							onChange={() => {}}
							styles={selectStyles}
							placeholder='Select a status'
						/>
					</div>
					<div className='field'>
						<label htmlFor='venue'>Venue</label>
						<Select
							id='venue'
							name='venue'
							value={venueOptions.find(({value}) => value === venue)}
							options={venueOptions}
							onChange={() => {}}
							styles={selectStyles}
							placeholder='Select a venue'
						/>
					</div>
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