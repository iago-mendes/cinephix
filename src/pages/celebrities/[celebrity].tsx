import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {FiUser} from 'react-icons/fi'
import {FaBirthdayCake, FaCity} from 'react-icons/fa'
import {SwiperSlide} from 'swiper/react'
import Image from 'next/image'

import Container from '../../styles/pages/celebrities/[celebrity]'
import api from '../../services/api'
import {Celebrity as CelebrityList} from '../../components/CelebrityCard'
import Loading from '../../components/Loading'
import Carousel, {CarouselCard} from '../../components/Carousel'
import formatDate from '../../utils/formatDate'
import React from 'react'
import SEOHead from '../../components/SEOHead'

interface CelebrityDetails
{
	id: number
  image: string
  name: string
  knownForDepartment: string
  birthday: string
  placeOfBirth: string
  biography: string
	credits:
	{
		cast: Array<
		{
			'id': number
			'title': string
			'image': string
			'character': string
			'overview': string
			'date': string
			'type': string
		}>
		crew: Array<
		{
			'id': number
			'title': string
			'image': string
			'overview': string
			'date': string
			'department': string
			'type': string
		}>
	}
}

interface CelebrityProps
{
	celebrity: CelebrityDetails
}

const Celebrity: React.FC<CelebrityProps> = ({celebrity}) =>
{
	const Router = useRouter()

	if (Router.isFallback)
		return <Loading />

	return (
		<Container biographyLength={celebrity.biography.length} >
			<SEOHead
				title={`${celebrity.name} | Cinephix`}
				description={celebrity.biography}
				image={celebrity.image}
			/>

			<main>
				<div className='img'>
					<Image src={celebrity.image} width={780} height={1170} layout='responsive'/>
				</div>
				<div className='info'>
					<h1>{celebrity.name}</h1>
					<div className='details'>
						<div className='detail'>
							<FiUser size={30} />
							<span>{celebrity.knownForDepartment}</span>
						</div>
						<div className='detail'>
							<FaBirthdayCake size={30} />
							<span>{formatDate(celebrity.birthday)}</span>
						</div>
						<div className='detail'>
							<FaCity size={30} />
							<span>{celebrity.placeOfBirth}</span>
						</div>
					</div>
					<p>{celebrity.biography}</p>
				</div>
			</main>

			<div className='cast'>
				<span>Cast ({celebrity.credits.cast.length})</span>
				<Carousel>
					{celebrity.credits.cast.map((media, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={media.image}
								primaryDisplay={media.title}
								secondaryDisplay={media.character}
								link={media.type === 'movie' ? `/movies/${media.id}` : `/tvshows/${media.id}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>

			<div className='crew'>
				<span>Crew ({celebrity.credits.crew.length})</span>
				<Carousel>
					{celebrity.credits.crew.map((media, index) => (
						<SwiperSlide key={index} >
							<CarouselCard
								image={media.image}
								primaryDisplay={media.title}
								secondaryDisplay={media.department}
								link={media.type === 'movie' ? `/movies/${media.id}` : `/tvshows/${media.id}`}
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
	const {data: celebrities}:{data: CelebrityList[]} = await api.get('celebrities')

	const paths = celebrities.map(celebrity => (
		{
			params: {celebrity: String(celebrity.id)}
		}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {celebrity: id} = ctx.params

	const {data: celebrity}:{data: CelebrityDetails} = await api.get(`celebrities/${id}`)

	return {
		props: {celebrity},
		revalidate: 60
	}
}

export default Celebrity