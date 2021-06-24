import {FiEdit3} from 'react-icons/fi'

import Container from '../../styles/components/modals/UserTvshow'
import React from 'react'
import Image from 'next/image'
import getTotalRating from '../../utils/getTotalRating'
import {useRouter} from 'next/router'
import ModalContainer from './Container'
import {UserTvshowListed as UserTvshow} from '../../models/userTvshow'

export interface Tvshow {
	id: number
	image: string
	title: string
	venue: string
	ratings: {
		engagement?: number
		consistency?: number
		screenplay?: number
		acting?: number
		cinematography?: number
		musicAndSound?: number
	}
}

export const defaultTvshow = {
	id: 0,
	image: '',
	title: '',
	venue: '',
	ratings: {
		engagement: 0,
		consistency: 0,
		screenplay: 0,
		acting: 0,
		cinematography: 0,
		musicAndSound: 0
	}
}

const ratingsLabels: {[ratingKey: string]: string} = {
	engagement: 'Engagement',
	consistency: 'Consistency',
	screenplay: 'Screenplay',
	acting: 'Acting',
	cinematography: 'Cinematography',
	musicAndSound: 'Music and sound'
}

interface UserTvshowModalProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	tvshow: UserTvshow
}

const UserTvshowModal: React.FC<UserTvshowModalProps> = ({
	isOpen,
	setIsOpen,
	tvshow
}) => {
	const {push} = useRouter()

	function getVenueColor(venue: string) {
		if (venue === 'Netflix') return '#ce0e0e'
		if (venue === 'Prime Video') return '#1ebbff'
		if (venue === 'Disney+') return '#2a22c4'
		if (venue === 'HBO Max') return '#861398'
		if (venue === 'Movie Theater') return '#803710'
		if (venue === 'Other') return '#656565'
	}

	function handleEdit() {
		setIsOpen(false)
		push(`/user/tvshows/${tvshow.id}/edit`)
	}

	return (
		<ModalContainer
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			expandLink={`/tvshows/${tvshow.id}`}
		>
			<Container>
				<div className="img">
					<Image
						src={tvshow.image}
						width={780}
						height={1170}
						layout="responsive"
					/>
				</div>
				<div className="info">
					<h1>{tvshow.title}</h1>
					<div className="group">
						<label>Venue</label>
						<span>
							{tvshow.venue && (
								<svg width={15} height={15}>
									<circle
										cx={7.5}
										cy={7.5}
										r={7.5}
										fill={getVenueColor(tvshow.venue)}
									/>
								</svg>
							)}
							<span style={{marginLeft: 5}}>
								{tvshow.venue || 'not informed'}
							</span>
						</span>
					</div>
					<div className="group">
						<label>Ratings</label>
						<div className="rating">
							<label>Total:</label>
							{Object.values(tvshow.ratings).length !== 0 ? (
								getTotalRating(tvshow.ratings, true)
							) : (
								<span>not rated</span>
							)}
						</div>
						{Object.entries(tvshow.ratings).map(([ratingKey, value]) => (
							<div className="rating" key={ratingKey}>
								<label>{ratingsLabels[ratingKey]}:</label>
								<span>{value}</span>
							</div>
						))}
					</div>
				</div>
				<button className="edit" title="Edit" onClick={handleEdit}>
					<FiEdit3 size={30} />
				</button>
			</Container>
		</ModalContainer>
	)
}

export default UserTvshowModal
