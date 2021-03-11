import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'

import Container from '../../styles/pages/events/[event]'
import api from '../../services/api'
import Loading from '../../components/Loading'
import EventDetails from '../../models/event'
import SEOHead from '../../components/SEOHead'

interface EventProps
{
	event: EventDetails
}

const Event: React.FC<EventProps> = ({event}) =>
{
	const {isFallback} = useRouter()

	if (isFallback)
		return <Loading style={{height: 'calc(100vh - 5rem)'}} />

	return (
		<Container className='page' >
			<SEOHead
				title={`${event.name} | Cinephix`}
				description={event.description}
			/>

			<main>
				<svg width={50} height={50}>
					<rect width={50} height={50} fill={event.color} />
				</svg>
				<div className='info'>
					<h1 className='name'>
						{event.name}
					</h1>
					<p className='description'>
						{event.description}
					</p>
				</div>
			</main>

		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>
{
	const {data: events}:{data: EventDetails[]} = await api.get('events')

	const paths = events.map(event => (
		{
			params: {event: event.id}
		}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {event: id} = ctx.params

	const {data: event}:{data: EventDetails} = await api.get(`events/${id}`)

	return {
		props: {event},
		revalidate: 60
	}
}

export default Event