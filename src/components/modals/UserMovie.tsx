import Modal from 'react-modal'
import {FiEdit3, FiEye, FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'
import {useRouter} from 'next/router'

import Container from '../../styles/components/modals/UserMovie'
import {modalStyle} from '../../styles/global'
import React from 'react'
import Image from 'next/image'
import getTotalRating from '../../utils/getTotalRating'
import {UserMovieListed} from '../../models/userMovie'
import getVenue from '../../utils/getVenue'
import getRatingLabel from '../../utils/getRatingLabel'
import api from '../../services/api'
import useUser from '../../hooks/useUser'
import confirmAlert from '../../utils/alerts/confirm'
import errorAlert from '../../utils/alerts/error'

Modal.setAppElement('#__next')

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

	function handleExpand()
	{
		setIsOpen(false)
		push(`/movies/${movie.data.id}`)
	}

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
				confirmAlert(`'${movie.data.title}' was successfully marked as watched!`)
				setIsOpen(false)
			})
			.catch(err =>
			{
				errorAlert(err.response.data.message)
			})
	}

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<button className='expand' title='Expand' onClick={handleExpand} >
						<BiExpand size={25} />
					</button>
					<button className='close' title='Close' onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>

				<main>
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
												? (
													<span>
														{getTotalRating(movie.ratings, true)} ({getTotalRating(movie.ratings)})
													</span>
												)
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
				</main>
			</Container>
		</Modal>
	)
}

export default UserMovieModal