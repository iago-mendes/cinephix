import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {FiCalendar, FiInfo, FiStar, FiArrowRight} from 'react-icons/fi'
import {SwiperSlide} from 'swiper/react'
import Image from 'next/image'

import Container from '../../styles/pages/tvshows/[tvshow]'
import api from '../../services/api'
import {Media} from '../../components/MediaCard'
import Loading from '../../components/Loading'
import Carousel, {CarouselCard} from '../../components/Carousel'
import formatDate from '../../utils/formatDate'
import React from 'react'

interface TvshowDetails
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
	const Router = useRouter()

	if (Router.isFallback)
		return <Loading />

	return (
		<Container overviewLength={tvshow.overview.length} >
			<Head>
				<title>TV Show</title>
			</Head>

			<main>
				<div className='img'>
					<Image src={tvshow.image} width={780} height={1170} layout='responsive'/>
				</div>
				<div className='info'>
					<h1>{tvshow.title}</h1>
					<div className='details'>
						<div className='detail'>
							<FiCalendar size={30} />
							<span>{formatDate(tvshow.startDate)}</span>
							<FiArrowRight size={30} />
							<span>{formatDate(tvshow.endDate)}</span>
						</div>
						<div className="group">
							<div className='detail'>
								<FiInfo size={30} />
								<span>{tvshow.status}</span>
							</div>
							<div className='detail'>
								<FiStar size={30} />
								<span>{tvshow.rating}</span>
							</div>
						</div>
						<div className="group">
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

			<div className='cast'>
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

			<div className='crew'>
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

export const getStaticPaths: GetStaticPaths = async ctx =>
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