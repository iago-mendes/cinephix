import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {FiCalendar, FiInfo, FiStar, FiArrowRight, FiPlus, FiEdit3} from 'react-icons/fi'
import {SwiperSlide} from 'swiper/react'
import Image from 'next/image'

import Container from '../../styles/pages/tvshows/[tvshow]'
import api from '../../services/api'
import {Media} from '../../components/cards/Media'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import CarouselCard from '../../components/cards/Carousel'
import formatDate from '../../utils/formatDate'
import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import UserTvshow, {defaultUserTvshow} from '../../models/userTvshow'
import getTotalRating from '../../utils/getTotalRating'
import getStatusLabel from '../../utils/getStatusLabel'
import getVenue from '../../utils/getVenue'
import SEOHead from '../../components/SEOHead'

export interface TvshowDetails
{
	id: number
  image: string
  title: string
  startDate: string
  endDate: string
  status: string
  inProduction: boolean
  rating: number
  seasonsNumber: number
  episodesNumber: number
  overview: string
  genres: Array<
	{
		id: number
		name: string
	}>
	credits:
	{
		cast: Array<
		{
			id: number
			name: string
			image: string
			character: string
		}>
		crew: Array<
		{
			id: number
			name: string
			image: string
			department: string
		}>
	}
}

interface TvshowProps
{
	tvshow: TvshowDetails
}

const Tvshow: React.FC<TvshowProps> = ({tvshow}) =>
{
	const router = useRouter()
	const {user} = useUser()

	const [userTvshow, setUserTvshow] = useState<UserTvshow>(defaultUserTvshow)

	useEffect(() =>
	{
		if (user && user.email && tvshow)
			api.get(`users/${user.email}/tvshows/${tvshow.id}`)
				.then(({data}:{data: UserTvshow}) => setUserTvshow(data))
				.catch(() => setUserTvshow(defaultUserTvshow))
	}, [user, tvshow])

	if (router.isFallback)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<Container overviewLength={tvshow.overview.length} className='page' >
			<SEOHead
				title={`${tvshow.title} | Cinephix`}
				description={tvshow.overview}
				image={tvshow.image}
			/>

			<main>
				<div className='img'>
					<Image src={tvshow.image} width={780} height={1170} layout='responsive'/>
				</div>
				<div className='info'>
					<h1>{tvshow.title}</h1>
					<div className='details'>
						<div className='detail dates'>
							<FiCalendar size={30} />
							<span>{formatDate(tvshow.startDate)}</span>
							<FiArrowRight size={30} />
							<span>{formatDate(tvshow.endDate)}</span>
						</div>
						<div className='group'>
							<div className='detail'>
								<FiInfo size={30} />
								<span>{tvshow.status}</span>
							</div>
							<div className='detail'>
								<FiStar size={30} />
								<span>{tvshow.rating}</span>
							</div>
						</div>
						<div className='group'>
							<div className='detail'>
								<strong>Nº of seasons:</strong>
								<span>{tvshow.seasonsNumber}</span>
							</div>
							<div className='detail'>
								<strong>Nº of episodes:</strong>
								<span>{tvshow.episodesNumber}</span>
							</div>
						</div>
					</div>
					<p>{tvshow.overview}</p>
					<ul>
						{tvshow.genres.map(genre => (
							<li key={genre.id} >
								{genre.name}
							</li>
						))}
					</ul>
				</div>
			</main>

			<div className='row userTvshow'>
				{
					(user && userTvshow !== defaultUserTvshow)
						? (
							<>
								<div className='group'>
									<label>My status</label>
									<span>{getStatusLabel(userTvshow.status)}</span>
								</div>
								{
									userTvshow.venue && (
										<div className='group'>
											<label>My venue</label>
											<span>{getVenue(userTvshow.venue)}</span>
										</div>
									)
								}
								{
									Object.values(userTvshow.ratings).length !== 0 && (
										<div className='group'>
											<label>My rating</label>
											<span>{getTotalRating(userTvshow.ratings, true)}</span>
										</div>
									)
								}
								<button className='edit' title='Edit' onClick={() => router.push(`/user/tvshows/${tvshow.id}/edit`)} >
									<FiEdit3 size={30} />
								</button>
							</>
						)
						: (
							<button className='add' onClick={() => router.push(`/user/tvshows/${tvshow.id}/add`)} >
								<FiPlus size={30} />
								<span>Add to your TV shows</span>
							</button>
						)
				}
			</div>

			<div className='row carousel'>
				<span>Cast ({tvshow.credits.cast.length})</span>
				<Carousel>
					{tvshow.credits.cast.map((celebrity, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={celebrity.image}
								primaryDisplay={celebrity.name}
								secondaryDisplay={celebrity.character}
								link={`/celebrities/${celebrity.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>

			<div className='row carousel'>
				<span>Crew ({tvshow.credits.crew.length})</span>
				<Carousel>
					{tvshow.credits.crew.map((celebrity, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={celebrity.image}
								primaryDisplay={celebrity.name}
								secondaryDisplay={celebrity.department}
								link={`/celebrities/${celebrity.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>
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

export default Tvshow