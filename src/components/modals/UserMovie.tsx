import Modal from 'react-modal'
import {FiEdit3, FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'
import {useRouter} from 'next/router'

import Container from '../../styles/components/modals/UserTvshow'
import {modalStyle} from '../../styles/global'
import React from 'react'
import Image from 'next/image'
import getTotalRating from '../../utils/getTotalRating'
import {UserMovieListed} from '../../models/userMovie'
import getVenue from '../../utils/getVenue'
import getRatingLabel from '../../utils/getRatingLabel'

Modal.setAppElement('#__next')

interface UserMovieModalProps
{
	isOpen: boolean
	setIsOpen: Function

	movie: UserMovieListed
}

const UserMovieModal: React.FC<UserMovieModalProps> = ({isOpen, setIsOpen, movie}) =>
{
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
						<div className='group'>
							<label>Ratings</label>
							<div className='rating'>
								<label>Total:</label>
								{
									Object.values(movie.ratings).length !== 0
									? (
										<span>
											{getTotalRating(movie.ratings, true, 15)} ({getTotalRating(movie.ratings)})
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