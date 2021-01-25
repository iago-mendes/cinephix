import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FiCheck, FiX} from 'react-icons/fi'
import {MdClear} from 'react-icons/md'

import Container, {RangeInput} from '../../styles/components/forms/global'
import api from '../../services/api'
import MovieDetails from '../../models/movie'
import {selectStyles} from '../../styles/global'
import useUser from '../../hooks/useUser'
import confirmAlert from '../../utils/alerts/confirm'
import errorAlert from '../../utils/alerts/error'
import calcTotalRating from '../../utils/getTotalRating'
import Ratings, {defaultMovieRatings} from '../../models/ratings'
import UserMovie, {defaultUserMovie} from '../../models/userMovie'
import {SelectOption} from '../../models'
import getRatingLabel from '../../utils/getRatingLabel'

interface MovieFormProps
{
	movie: MovieDetails
	method: string

	userMovie?: UserMovie
}

const MovieForm: React.FC<MovieFormProps> = ({movie, method, userMovie}) =>
{
	const {query, back, push} = useRouter()
	const {user} = useUser()

	const [watched, setWatched] = useState(false)
	const [venue, setVenue] = useState('')
	const [ratings, setRatings] = useState<Ratings>(defaultMovieRatings)

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
		const {watched} = query

		if (watched && Boolean(watched))
			setWatched(Boolean(watched))
	}, [query])

	useEffect(() =>
	{
		if (userMovie && userMovie !== defaultUserMovie)
		{
			setWatched(userMovie.watched)
			setVenue(userMovie.venue)
			Object.entries(userMovie.ratings).map(([ratingKey, value]) =>
			{
				handleChangeRating(ratingKey, undefined, value)
			})
		}
	}, [userMovie])

	function handleChangeRating(ratingKey: string, e?: ChangeEvent<HTMLInputElement>, ratingValue?: number)
	{
		let tmpRatings = {...ratings}

		const rating = e ? Number(e.target.value) : ratingValue
		if (rating >= 0 && rating <= 10)
			tmpRatings[ratingKey] = rating
			
		setRatings(tmpRatings)
	}

	function handleClearRating(ratingKey: string)
	{
		let tmpRatings = {...ratings}
		tmpRatings[ratingKey] = -1
		setRatings(tmpRatings)
	}

	function handleSubmit(e: FormEvent)
	{
		e.preventDefault()

		const data =
		{
			id: movie.id,
			watched,
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
			api.post(`users/${user.email}/movies`, data)
				.then(() =>
				{
					confirmAlert(`'${movie.title}' was successfully added to your movies!`)
					push('/user/movies')
				})
				.catch(err =>
				{
					errorAlert(err.response.data.message)
				})
		}
		else if (method === 'put')
		{
			api.put(`users/${user.email}/movies/${userMovie.data.id}`, data)
				.then(() =>
				{
					confirmAlert(`'${movie.title}' was successfully edited!`)
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
			<div className='img'>
				<Image src={movie.image} width={780} height={1170} layout='responsive'/>
			</div>
			<div className='info'>
				<h1>{movie.title}</h1>
				<form onSubmit={handleSubmit} >
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
							<span>{calcTotalRating(ratings) || 'not rated'}</span>
						</div>
						{Object.entries(ratings).map(([ratingKey, value]) => (
							<div className='rating' key={ratingKey}>
								<label>{getRatingLabel('movie', ratingKey)}:</label>
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

export default MovieForm