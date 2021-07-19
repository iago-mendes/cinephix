import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Select from 'react-select'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {FiCheck, FiX} from 'react-icons/fi'
import {MdClear} from 'react-icons/md'
import {Trans, t} from '@lingui/macro'

import Container, {RangeInput} from './styles'
import api from '../../services/api'
import TvshowDetails, {loadingTvshow} from '../../models/tvshow'
import {selectStyles} from '../../styles/global'
import {useAuth} from '../../hooks/useAuth'
import successAlert from '../../utils/alerts/success'
import errorAlert from '../../utils/alerts/error'
import getTotalRating from '../../utils/getTotalRating'
import Ratings, {defaultTvshowRatings} from '../../models/ratings'
import {UserTvshowDetails} from '../../models/userTvshow'
import {venues} from '../../assets/db/venues'
import {SkeletonLoading} from '../../utils/skeletonLoading'

interface SelectOption {
	label: string
	value: string
}

const ratingsLabels: {[ratingKey: string]: string} = {
	engagement: 'Engagement',
	consistency: 'Consistency',
	screenplay: 'Screenplay',
	acting: 'Acting',
	cinematography: 'Cinematography',
	musicAndSound: 'Music and sound'
}

interface TvshowFormProps {
	method: string

	userTvshow?: UserTvshowDetails
}

const TvshowForm: React.FC<TvshowFormProps> = ({method}) => {
	const {query, back, push, locale: language} = useRouter()
	const {user} = useAuth()

	const tvshowId = Number(query.tvshow)
	const statusKey = String(query.status)

	const [status, setStatus] = useState('')
	const [venue, setVenue] = useState('')
	const [ratings, setRatings] = useState<Ratings>(defaultTvshowRatings)

	const [tvshow, setTvshow] = useState(loadingTvshow)

	const statusOptions: SelectOption[] = [
		{label: 'Watch list', value: 'watchList'},
		{label: 'Watching', value: 'watching'},
		{label: 'Waiting', value: 'waiting'},
		{label: 'Completed', value: 'completed'},
		{label: 'Stopped', value: 'stopped'},
		{label: 'Paused', value: 'paused'}
	]

	const venueOptions: SelectOption[] = venues.map(({name}) => ({
		label: name,
		value: name
	}))

	useEffect(() => {
		if (tvshowId)
			api
				.get(`tvshows/${tvshowId}`, {params: {language}})
				.then(({data}: {data: TvshowDetails}) => setTvshow(data))
	}, [tvshowId])

	useEffect(() => {
		if (method === 'put' && user && tvshowId)
			api
				.get(`users/${user.email}/tvshows/${tvshowId}`, {params: {language}})
				.then(({data}: {data: UserTvshowDetails}) => {
					setStatus(data.status)
					setVenue(data.venue)

					const tmpRatings = {...ratings}
					Object.entries(data.ratings).map(([ratingKey, value]) => {
						if (value >= 0 && value <= 10) tmpRatings[ratingKey] = value
					})
					setRatings(tmpRatings)
				})
	}, [user, tvshowId])

	useEffect(() => {
		if (statusKey) setStatus(statusKey)
	}, [statusKey])

	function handleChangeRating(
		ratingKey: string,
		e?: ChangeEvent<HTMLInputElement>
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
			id: tvshow.id,
			status: status,
			venue: venue !== '' ? venue : undefined,
			ratings: {
				engagement: ratings.engagement >= 0 ? ratings.engagement : undefined,
				consistency: ratings.consistency >= 0 ? ratings.consistency : undefined,
				screenplay: ratings.screenplay >= 0 ? ratings.screenplay : undefined,
				acting: ratings.acting >= 0 ? ratings.acting : undefined,
				cinematography:
					ratings.cinematography >= 0 ? ratings.cinematography : undefined,
				musicAndSound:
					ratings.musicAndSound >= 0 ? ratings.musicAndSound : undefined
			}
		}

		if (method === 'post') {
			api
				.post(`users/${user.email}/tvshows`, data)
				.then(() => {
					successAlert(
						`'${tvshow.title}' was successfully added to your TV shows!`
					)
					push('/user/tvshows')
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})
		} else if (method === 'put') {
			api
				.put(`users/${user.email}/tvshows/${tvshowId}`, data)
				.then(() => {
					successAlert(`'${tvshow.title}' was successfully edited!`)
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
				{tvshow.title === '_loading' ? (
					<SkeletonLoading />
				) : (
					<Image
						src={tvshow.image}
						width={780}
						height={1170}
						layout="responsive"
					/>
				)}
			</div>

			<div className="info">
				{tvshow.title === '_loading' ? (
					<SkeletonLoading height="2.5rem" width="20rem" />
				) : (
					<h1>{tvshow.title}</h1>
				)}
				<form onSubmit={handleSubmit}>
					<div className="field">
						<label htmlFor="status">
							<Trans>Status</Trans>
						</label>
						<Select
							id="status"
							name="status"
							value={statusOptions.find(({value}) => value === status)}
							options={statusOptions}
							onChange={e => setStatus(e.value)}
							styles={selectStyles}
							placeholder={t`Select a status`}
							className="select"
							isSearchable={false}
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
								<label>{ratingsLabels[ratingKey]}:</label>
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

export default TvshowForm
