import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'
import Image from 'next/legacy/image'
import {useRouter} from 'next/router'
import {FiCheck, FiX} from 'react-icons/fi'
import {MdClear} from 'react-icons/md'
import Switch from 'react-switch'
import {Trans, t} from '@lingui/macro'

import Container, {RangeInput} from './styles'
import api from '../../services/api'
import MovieDetails, {loadingMovie} from '../../models/movie'
import {selectStyles} from '../../styles/global'
import {useAuth} from '../../hooks/useAuth'
import successAlert from '../../utils/alerts/success'
import errorAlert from '../../utils/alerts/error'
import getTotalRating from '../../utils/getTotalRating'
import Ratings, {defaultMovieRatings} from '../../models/ratings'
import UserMovie from '../../models/userMovie'
import {SelectOption} from '../../models'
import getRatingLabel from '../../utils/getRatingLabel'
import {venues} from '../../assets/db/venues'
import {SkeletonLoading} from '../../utils/skeletonLoading'

interface MovieFormProps {
	method: string
}

const MovieForm: React.FC<MovieFormProps> = ({method}) => {
	const {query, back, push, locale: language} = useRouter()
	const {user} = useAuth()

	const movieId = Number(query.movie)
	const watchedFromRoute = Boolean(query.watched)

	const [watched, setWatched] = useState(false)
	const [venue, setVenue] = useState('')
	const [ratings, setRatings] = useState<Ratings>(defaultMovieRatings)

	const [movie, setMovie] = useState(loadingMovie)

	const venueOptions: SelectOption[] = venues.map(({name}) => ({
		label: name,
		value: name
	}))

	useEffect(() => {
		if (!Number.isNaN(movieId))
			api
				.get(`movies/${movieId}`, {params: {language}})
				.then(({data}: {data: MovieDetails}) => setMovie(data))
	}, [language, movieId])

	useEffect(() => {
		if (method === 'put' && user && !Number.isNaN(movieId))
			api
				.get(`users/${user.email}/movies/${movieId}`, {params: {language}})
				.then(({data}: {data: UserMovie}) => {
					setWatched(data.watched)
					setVenue(data.venue)

					const tmpRatings = {...ratings}
					Object.entries(data.ratings).map(([ratingKey, value]) => {
						if (value >= 0 && value <= 10) tmpRatings[ratingKey] = value
					})
					setRatings(tmpRatings)
				})
	}, [user, movieId, method, language, ratings])

	useEffect(() => {
		if (watchedFromRoute != undefined) setWatched(watchedFromRoute)
	}, [watchedFromRoute])

	function handleChangeRating(
		ratingKey: string,
		e: ChangeEvent<HTMLInputElement>
	) {
		const tmpRatings = {...ratings}

		const rating = Number(e.target.value)
		if (rating >= 0 && rating <= 10) tmpRatings[ratingKey] = rating

		setRatings(tmpRatings)
	}

	function handleClearRating(ratingKey: string) {
		const tmpRatings = {...ratings}
		tmpRatings[ratingKey] = -1
		setRatings(tmpRatings)
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault()

		const data = {
			id: movie.id,
			watched,
			venue: venue !== '' ? venue : undefined,
			ratings: {
				screenplay: ratings.screenplay >= 0 ? ratings.screenplay : undefined,
				pacing: ratings.pacing >= 0 ? ratings.pacing : undefined,
				acting: ratings.acting >= 0 ? ratings.acting : undefined,
				cinematography:
					ratings.cinematography >= 0 ? ratings.cinematography : undefined,
				musicAndSound:
					ratings.musicAndSound >= 0 ? ratings.musicAndSound : undefined
			}
		}

		if (method === 'post') {
			api
				.post(`users/${user.email}/movies`, data)
				.then(() => {
					successAlert(
						`'${movie.title}' was successfully added to your movies!`
					)
					push('/user/movies')
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})
		} else if (method === 'put') {
			api
				.put(`users/${user.email}/movies/${movieId}`, data)
				.then(() => {
					successAlert(`'${movie.title}' was successfully edited!`)
					back()
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})
		}
	}

	return (
		<Container>
			<div className="img">
				{movie.title === '_loading' ? (
					<SkeletonLoading />
				) : (
					<Image
						src={movie.image}
						width={780}
						height={1170}
						layout="responsive"
					/>
				)}
			</div>

			<div className="info">
				{movie.title === '_loading' ? (
					<SkeletonLoading height="2.5rem" width="20rem" />
				) : (
					<h1>{movie.title}</h1>
				)}
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="watched">
							<Trans>Watched</Trans>
						</label>
						<Switch
							name="watched"
							id="watched"
							checked={watched}
							onChange={setWatched}
							onHandleColor="#d8d8d8"
							offHandleColor="#d8d8d8"
							className="switch"
						/>
					</div>
					<div className="field">
						<label htmlFor="venue">
							<Trans>Venue</Trans>
						</label>
						<Select
							id="venue"
							name="venue"
							value={venueOptions.find(({value}) => value === venue)}
							options={venueOptions}
							onChange={e => setVenue(e.value)}
							styles={selectStyles}
							placeholder={t`Select a venue`}
							className="select"
							isSearchable={false}
						/>
					</div>
					<div className="rangeFields">
						<label>
							<Trans>Ratings</Trans>
						</label>
						<div className="rating">
							<label>
								<Trans>Total:</Trans>
							</label>
							<span>{getTotalRating(ratings) || 'not rated'}</span>
						</div>
						{Object.entries(ratings).map(([ratingKey, value]) => (
							<div className="rating" key={ratingKey}>
								<label>{getRatingLabel('movie', ratingKey)}:</label>
								<div className="group">
									{value >= 0 ? (
										<input
											type="number"
											value={value}
											onChange={e => handleChangeRating(ratingKey, e)}
										/>
									) : (
										<span>not rated</span>
									)}
									<div className="group2">
										<RangeInput
											type="range"
											min={0}
											max={10}
											value={value >= 0 ? value : 5}
											onChange={e => handleChangeRating(ratingKey, e)}
											isUndefined={value < 0}
										/>

										<button
											className="clear"
											title={t`Clear rating`}
											onClick={() => handleClearRating(ratingKey)}
											type="button"
										>
											<MdClear size={15} />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="buttons">
						<button
							className="cancel"
							title={t`Cancel`}
							onClick={back}
							type="button"
						>
							<FiX size={25} />
						</button>
						<button className="confirm" title={t`Confirm`} type="submit">
							<FiCheck size={25} />
						</button>
					</div>
				</form>
			</div>
		</Container>
	)
}

export default MovieForm
