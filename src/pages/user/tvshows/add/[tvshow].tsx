import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'
import Image from 'next/image'
import {useRouter} from 'next/router'

import Container, {RangeInput} from '../../../../styles/pages/user/tvshows/add/[tvshow]'
import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import {TvshowDetails} from '../../../tvshows/[tvshow]'
import Loading from '../../../../components/Loading'
import {selectStyles} from '../../../../styles/global'

interface SelectOption
{
	label: string
	value: string
}

interface Ratings
{
	[ratingKey: string]: number
}

const defaultRatings: Ratings =
{
	engagement: -1,
	consistency: -1,
	screenplay: -1,
	acting: -1,
	cinematography: -1,
	musicAndSound: -1
}

const ratingsLabels: {[ratingKey: string]: string} =
{
	engagement: 'Engagement',
	consistency: 'Consistency',
	screenplay: 'Screenplay',
	acting: 'Acting',
	cinematography: 'Cinematography',
	musicAndSound: 'Music and sound'
}

interface AddTvshowProps
{
	tvshow: TvshowDetails
}

const AddTvshow: React.FC<AddTvshowProps> = ({tvshow}) =>
{
	const {query} = useRouter()

	const [status, setStatus] = useState('')
	const [venue, setVenue] = useState('')
	const [ratings, setRatings] = useState<Ratings>(defaultRatings)

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

	useEffect(() =>
	{
		const {status: statusKey} = query

		if (statusKey)
			setStatus(String(statusKey))
	}, [query])

	function handleChangeRating(e: ChangeEvent<HTMLInputElement>, ratingKey: string)
	{
		let tmpRatings = {...ratings}

		const rating = Number(e.target.value)
		if (rating >= 0 && rating <= 10)
			tmpRatings[ratingKey] = rating
			
		setRatings(tmpRatings)
	}

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
					<div className='selectField'>
						<label htmlFor='status'>Status</label>
						<Select
							id='status'
							name='status'
							value={statusOptions.find(({value}) => value === status)}
							options={statusOptions}
							onChange={e => setStatus(e.value)}
							styles={selectStyles}
							placeholder='Select a status'
							className='select'
						/>
					</div>
					<div className='selectField'>
						<label htmlFor='venue'>Venue</label>
						<Select
							id='venue'
							name='venue'
							value={venueOptions.find(({value}) => value === venue)}
							options={venueOptions}
							onChange={e => setVenue(e.value)}
							styles={selectStyles}
							placeholder='Select a venue'
							className='select'
						/>
					</div>
					<div className='rangeFields'>
						<label>Ratings</label>
						<div className='rating'>
							<label>Total:</label>
							<span>7</span>
						</div>
						{Object.entries(ratings).map(([ratingKey, value]) => (
							<div className='rating' key={ratingKey}>
								<label>{ratingsLabels[ratingKey]}:</label>
								<div className="group">
									{
										value >= 0
										? (
											<input
												type="number"
												value={value}
												onChange={e => handleChangeRating(e, ratingKey)}
											/>
										)
										: (
											<span>not rated</span>
										)
									}
									<RangeInput
										type='range'
										min={0}
										max={10}
										value={value >= 0 ? value : 5}
										onChange={e => handleChangeRating(e, ratingKey)}
										isUndefined={value < 0}
									/>
								</div>
							</div>
						))}
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