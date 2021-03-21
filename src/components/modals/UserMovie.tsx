import {FiEdit3, FiEye} from 'react-icons/fi'
import {useRouter} from 'next/router'

import Container from '../../styles/components/modals/UserMovie'
import React from 'react'
import Image from 'next/image'
import getTotalRating from '../../utils/getTotalRating'
import {UserMovieListed} from '../../models/userMovie'
import getVenue from '../../utils/getVenue'
import getRatingLabel from '../../utils/getRatingLabel'
import api from '../../services/api'
import useUser from '../../hooks/useUser'
import successAlert from '../../utils/alerts/success'
import errorAlert from '../../utils/alerts/error'
import ModalContainer from './Container'

interface UserMovieModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	movie: UserMovieListed
	revalidate: () => void
}

const UserMovieModal: React.FC<UserMovieModalProps> = ({isOpen, setIsOpen, movie, revalidate}) =>
{
	const {user} = useUser()
	const {push} = useRouter()

	function handleEdit()
	{
		setIsOpen(false)
		push(`/user/movies/${movie.data.id}/edit`)
	}

	function handleMoveToWatched()
	{
		const data =
		{
			watched: true
		}

		api.put(`users/${user.email}/movies/${movie.data.id}`, data)
			.then(() =>
			{
				revalidate()
				successAlert(`'${movie.data.title}' was successfully marked as watched!`)
				setIsOpen(false)
			})
			.catch(err =>
			{
				errorAlert(err.response.data.message)
			})
	}

	return (
		<ModalContainer
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}

			expandLink={`/movies/${movie.data.id}`}
		>
			<Container>
				<div className='img'>
					<Image src={movie.data.image} width={780} height={1170} layout='responsive' />
				</div>
				<div className='info'>
					<h1>{movie.data.title}</h1>
					{
						movie.venue && (
							<div className='group'>
								<label>Venue</label>
								<span>{getVenue(movie.venue)}</span>
							</div>
						)
					}
					{
						movie.watched && (
							<div className='group'>
								<label>Ratings</label>
								<div className='rating'>
									<label>Total:</label>
									{
										Object.values(movie.ratings).length !== 0
											? getTotalRating(movie.ratings, true)
											: (
												<span>not rated</span>
											)
									}
								</div>
								{Object.entries(movie.ratings).map(([ratingKey, value]) => (
									<div className='rating' key={ratingKey}>
										<label>{getRatingLabel('movie', ratingKey)}:</label>
										<span>{value}</span>
									</div>
								))}
							</div>
						)
					}
					{
						!movie.watched && (
							<button className='move' onClick={handleMoveToWatched} >
								<FiEye size={25} />
								<span>Mark as watched</span>
							</button>
						)
					}
				</div>
				<button className='edit' title='Edit' onClick={handleEdit} >
					<FiEdit3 size={30} />
				</button>
			</Container>
		</ModalContainer>
	)
}

export default UserMovieModal