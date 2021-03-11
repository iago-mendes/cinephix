import {GetStaticProps} from 'next'

import api from '../../services/api'
import GridPaginate from '../../components/GridPaginate'
import oscars from '../../assets/backgrounds/oscars.jpg'
import HeaderWithBackground from '../../components/HeaderWithBackground'
import SEOHead from '../../components/SEOHead'
import {EventListed} from '../../models/event'

interface MoviesProps
{
	events: EventListed[]
}

const Movies: React.FC<MoviesProps> = ({events}) =>
{
	return (
		<div className='page' >
			<SEOHead
				title='Events | Cinephix'
			/>

			<HeaderWithBackground background={oscars} display='Events' />

			<GridPaginate
				page={1}
				setPage={() => {}}
				totalPages={1}
				loading={false}
				noResults={events.length === 0}
			>
				{events.map(event => (
					<h1 key={event.id} >{event.name}</h1>
				))}
			</GridPaginate>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () =>
{
	const {data}:{data: EventListed[]} = await api.get('/events')

	return {
		props: {events: data},
		revalidate: 5
	}
}

export default Movies