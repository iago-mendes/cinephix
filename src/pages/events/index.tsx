import {GetStaticProps} from 'next'
import {t} from '@lingui/macro'

import api from '../../services/api'
import GridPaginate from '../../components/GridPaginate'
import oscars from '../../assets/images/backgrounds/oscars.jpg'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import {EventListed} from '../../models/event'
import EventCard from '../../components/cards/Event'

interface EventsProps {
	events: EventListed[]
}

const Events: React.FC<EventsProps> = ({events}) => {
	return (
		<div className="page">
			<SEOHead title={t`Events` + ' | Cinephix'} />

			<HeaderWithBackground background={oscars} display={t`Events`} />

			<GridPaginate
				page={1}
				setPage={() => {}}
				totalPages={1}
				loading={false}
				noResults={events.length === 0}
				hidePaginate
				noResultsMessage={t`No events open at the moment!`}
			>
				{events.map((event, index) => (
					<EventCard key={index} event={event} />
				))}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async ctx => {
	const language = ctx.locale

	const {data}: {data: EventListed[]} = await api.get('/events', {
		params: {language}
	})

	return {
		props: {events: data},
		revalidate: 5
	}
}

export default Events
