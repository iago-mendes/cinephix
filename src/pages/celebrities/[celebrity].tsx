import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {FiUser} from 'react-icons/fi'
import {FaBirthdayCake, FaCity} from 'react-icons/fa'

import api from '../../services/api'
import {Celebrity as CelebrityList} from '../../components/_cards/Celebrity'
import {Carousel} from '../../components/Carousel'
import {CarouselCard} from '../../components/_cards/Carousel'
import formatDate from '../../utils/formatDate'
import React from 'react'
import SEOHead from '../../components/SEOHead'
import {DetailsPageLayout} from '../../components/_layouts/DetailsPage'
import {OptimizedImage} from '../../components/OptimizedImage'

interface CelebrityDetails {
	id: number
	image: string
	name: string
	knownForDepartment: string
	birthday: string
	placeOfBirth: string
	biography: string
	credits: {
		cast: Array<{
			id: number
			title: string
			image: string
			character: string
			overview: string
			date: string
			type: string
		}>
		crew: Array<{
			id: number
			title: string
			image: string
			overview: string
			date: string
			department: string
			type: string
		}>
	}
}

interface CelebrityProps {
	celebrity: CelebrityDetails
}

const Celebrity: React.FC<CelebrityProps> = ({celebrity}) => {
	const {isFallback} = useRouter()

	return (
		<DetailsPageLayout
			isLoading={isFallback}
			overviewLength={celebrity.biography.length}
			className="page"
		>
			<SEOHead
				title={`${celebrity.name} | Cinephix`}
				description={celebrity.biography}
				image={celebrity.image}
			/>

			<main>
				<OptimizedImage src={celebrity.image} alt={`${celebrity.name} image`} />
				<div className="info">
					<h1>{celebrity.name}</h1>
					<div className="details">
						<div className="detail">
							<FiUser size={30} />
							<span>{celebrity.knownForDepartment}</span>
						</div>
						<div className="detail">
							<FaBirthdayCake size={30} />
							<span>{formatDate(celebrity.birthday)}</span>
						</div>
						<div className="detail">
							<FaCity size={30} />
							<span>{celebrity.placeOfBirth}</span>
						</div>
					</div>
					<p>{celebrity.biography}</p>
				</div>
			</main>

			<div className="row carousel">
				<span>Cast ({celebrity.credits.cast.length})</span>
				<Carousel numberOfItems={celebrity.credits.cast.length}>
					{celebrity.credits.cast.map(media => (
						<CarouselCard
							key={media.id}
							image={media.image}
							primaryDisplay={media.title}
							secondaryDisplay={media.character}
							link={
								media.type === 'movie'
									? `/movies/${media.id}`
									: `/tvshows/${media.id}`
							}
						/>
					))}
				</Carousel>
			</div>

			<div className="row carousel">
				<span>Crew ({celebrity.credits.crew.length})</span>
				<Carousel numberOfItems={celebrity.credits.crew.length}>
					{celebrity.credits.crew.map(media => (
						<CarouselCard
							key={media.id}
							image={media.image}
							primaryDisplay={media.title}
							secondaryDisplay={media.department}
							link={
								media.type === 'movie'
									? `/movies/${media.id}`
									: `/tvshows/${media.id}`
							}
						/>
					))}
				</Carousel>
			</div>
		</DetailsPageLayout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {data: celebrities}: {data: CelebrityList[]} = await api.get(
		'celebrities'
	)

	const paths = celebrities.map(celebrity => ({
		params: {celebrity: String(celebrity.id)}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx => {
	const {celebrity: id} = ctx.params
	const language = ctx.locale

	const {data: celebrity}: {data: CelebrityDetails} = await api.get(
		`celebrities/${id}`,
		{params: {language}}
	)

	return {
		props: {celebrity},
		revalidate: 60
	}
}

export default Celebrity
