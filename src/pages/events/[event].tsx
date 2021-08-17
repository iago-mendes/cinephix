import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {SwiperSlide} from 'swiper/react'
import {FiPlus} from 'react-icons/fi'

import Container from '../../styles/pages/events/[event]'
import api from '../../services/api'
import Loading from '../../components/Loading'
import EventDetails from '../../models/event'
import SEOHead from '../../components/SEOHead'
import Carousel from '../../components/Carousel'
import {EventMediaCard} from '../../components/_cards/EventMedia'
import {EventCelebrityCard} from '../../components/_cards/EventCelebrity'

interface EventProps {
	event: EventDetails
}

const Event: React.FC<EventProps> = ({event}) => {
	const {isFallback, push} = useRouter()

	if (isFallback) return <Loading style={{height: 'calc(100vh - 5rem)'}} />

	return (
		<Container color={event.color} className="page">
			<SEOHead
				title={`${event.name} | Cinephix`}
				description={event.description}
			/>

			<header>
				<h1 className="name">{event.name}</h1>
				<p className="description">{event.description}</p>
			</header>

			<div className="actions">
				<button onClick={() => push(`/groups/create?event=${event.id}`)}>
					<FiPlus size={30} />
					<span>Create group</span>
				</button>
			</div>

			{event.categories.map((category, index) => (
				<div className="category" key={index}>
					<div className="header">
						<h2 className="name">{category.name}</h2>
						<p className="description">{category.description}</p>
					</div>
					<Carousel className="carousel">
						{['movies', 'tvshows'].includes(category.type) &&
							category.media.map((media, index) => (
								<SwiperSlide key={index}>
									<EventMediaCard
										media={media}
										link={`/${category.type}/${media.id}`}
									/>
								</SwiperSlide>
							))}
						{category.type === 'celebrities' &&
							category.celebrities.map((eventCelebrity, index) => (
								<SwiperSlide key={index}>
									<EventCelebrityCard
										eventCelebrity={eventCelebrity}
										link={`/celebrities/${eventCelebrity.celebrity.id}`}
									/>
								</SwiperSlide>
							))}
					</Carousel>
				</div>
			))}
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {data: events}: {data: EventDetails[]} = await api.get('events')

	const paths = events.map(event => ({
		params: {event: event.id}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx => {
	const {event: id} = ctx.params
	const language = ctx.locale

	const {data: event}: {data: EventDetails} = await api.get(`events/${id}`, {
		params: {language}
	})

	return {
		props: {event},
		revalidate: 60
	}
}

export default Event
