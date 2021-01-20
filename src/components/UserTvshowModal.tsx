import Modal from 'react-modal'
import {FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'

import Container from '../styles/components/UserTvshowModal'
import {modalStyle} from '../styles/global'
import React from 'react'
import Image from 'next/image'

Modal.setAppElement('#__next')

export interface Tvshow
{
	id: number
	image: string
	title: string
	venue: string
	ratings:
	{
		engagement?: number
		consistency?: number
		screenplay?: number
		acting?: number
		cinematography?: number
		musicAndSound?: number
	}
}

export const defaultTvshow =
{
	id: 0,
	image: '',
	title: '',
	venue: '',
	ratings:
	{
		engagement: 0,
		consistency: 0,
		screenplay: 0,
		acting: 0,
		cinematography: 0,
		musicAndSound: 0
	}
}

interface UserTvshowModalProps
{
	isOpen: boolean
	setIsOpen: Function

	tvshow: Tvshow
}

const UserTvshowModal: React.FC<UserTvshowModalProps> = ({isOpen, setIsOpen, tvshow}) =>
{
	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<button className='expand' title='Expand' >
						<BiExpand size={25} />
					</button>
					<button className='close' title='Close' onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>

				<main>
					<div className='img'>
						<Image src={tvshow.image} width={780} height={1170} layout='responsive' />
					</div>
					<div className='info'>
						<h1>{tvshow.title}</h1>
						<div className='group'>
							<label>Venue</label>
							<span>{tvshow.venue}</span>
						</div>
						<div className='group'>
							<label>Ratings</label>
							<div className='rating'>
								<label>Total</label>
								<span>{tvshow.ratings.acting}</span>
							</div>
							{Object.entries(tvshow.ratings).map(([ratingKey, value]) => (
								<div className='rating' key={ratingKey}>
									<label>{ratingKey}</label>
									<span>{value}</span>
								</div>
							))}
						</div>
					</div>
				</main>
			</Container>
		</Modal>
	)
}

export default UserTvshowModal