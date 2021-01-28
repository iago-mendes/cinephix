import Head from 'next/head'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FiCheck, FiX} from 'react-icons/fi'
import {MdClear} from 'react-icons/md'

import Container, {RangeInput} from '../../styles/components/forms/global'
import api from '../../services/api'
import TvshowDetails from '../../models/tvshow'
import {selectStyles} from '../../styles/global'
import useUser from '../../hooks/useUser'
import confirmAlert from '../../utils/alerts/confirm'
import errorAlert from '../../utils/alerts/error'
import calcTotalRating from '../../utils/getTotalRating'
import Ratings, {defaultTvshowRatings} from '../../models/ratings'
import UserTvshow, { defaultUserTvshow } from '../../models/userTvshow'

interface SelectOption
{
	label: string
	value: string
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

interface TvshowFormProps
{
	tvshow: TvshowDetails
	method: string

	userTvshow?: UserTvshow
}

const TvshowForm: React.FC<TvshowFormProps> = ({tvshow, method, userTvshow}) =>
{
	const {query, back, push} = useRouter()
	const {user} = useUser()

	const [status, setStatus] = useState('')
	const [venue, setVenue] = useState('')
	const [ratings, setRatings] = useState<Ratings>(defaultTvshowRatings)

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

	useEffect(() =>
	{
		if (userTvshow && userTvshow !== defaultUserTvshow)
		{
			setStatus(userTvshow.status)
			setVenue(userTvshow.venue)
			Object.entries(userTvshow.ratings).map(([ratingKey, value]) =>
			{
				handleChangeRating(ratingKey, undefined, value)
			})
		}
	}, [userTvshow])

	function handleChangeRating(ratingKey: string, e?: ChangeEvent<HTMLInputElement>, ratingValue?: number)
	{
		const tmpRatings = {...ratings}

		const rating = e ? Number(e.target.value) : ratingValue
		if (rating >= 0 && rating <= 10)
			tmpRatings[ratingKey] = rating
			
		setRatings(tmpRatings)
	}

	function handleClearRating(ratingKey: string)
	{
		const tmpRatings = {...ratings}
		tmpRatings[ratingKey] = -1
		setRatings(tmpRatings)
	}

	function handleSubmit(e: FormEvent)
	{
		e.preventDefault()

		const data =
		{
			id: tvshow.id,
			status: status,
			venue: venue !== '' ? venue : undefined,
			ratings:
			{
				engagement: ratings.engagement >= 0 ? ratings.engagement : undefined,
				consistency: ratings.consistency >= 0 ? ratings.consistency : undefined,
				screenplay: ratings.screenplay >= 0 ? ratings.screenplay : undefined,
				acting: ratings.acting >= 0 ? ratings.acting : undefined,
				cinematography: ratings.cinematography >= 0 ? ratings.cinematography : undefined,
				musicAndSound: ratings.musicAndSound >= 0 ? ratings.musicAndSound : undefined
			}
		}
		
		if (method === 'post')
		{
			api.post(`users/${user.email}/tvshows`, data)
				.then(() =>
				{
					confirmAlert(`'${tvshow.title}' was successfully added to your TV shows!`)
					push('/user/tvshows')
				})
				.catch(err =>
				{
					errorAlert(err.response.data.message)
				})
		}
		else if (method === 'put')
		{
			api.put(`users/${user.email}/tvshows/${userTvshow.data.id}`, data)
				.then(() =>
				{
					confirmAlert(`'${tvshow.title}' was successfully edited!`)
					back()
				})
				.catch(err =>
				{
					errorAlert(err.response.data.message)
				})
		}
	}

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
							onChange={e => setStatus(e.value)}
							styles={selectStyles}
							placeholder='Select a status'
							className='select'
						/>
					</div>
					<div className='field'>
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
							<span>{calcTotalRating(ratings) || 'not rated'}</span>
						</div>
						{Object.entries(ratings).map(([ratingKey, value]) => (
							<div className='rating' key={ratingKey}>
								<label>{ratingsLabels[ratingKey]}:</label>
								<div className='group'>
									{
										value >= 0
											? (
												<input
													type='number'
													value={value}
													onChange={e => handleChangeRating(ratingKey, e)}
												/>
											)
											: (
												<span>not rated</span>
											)
									}
									<div className='group2'>
										<RangeInput
											type='range'
											min={0}
											max={10}
											value={value >= 0 ? value : 5}
											onChange={e => handleChangeRating(ratingKey, e)}
											isUndefined={value < 0}
										/>

										<button
											className='clear'
											title='Clear rating'
											onClick={() => handleClearRating(ratingKey)}
											type='button'
										>
											<MdClear size={15} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='buttons'>
						<button className='cancel' title='Cancel' onClick={back} type='button' >
							<FiX size={25} />
						</button>
						<button className='confirm' title='Confirm' type='submit' >
							<FiCheck size={25} />
						</button>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default TvshowForm