import {GetStaticPaths, GetStaticProps} from 'next'

import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import TvshowDetails from '../../../../models/tvshow'
import Loading from '../../../../components/Loading'
import TvshowForm from '../../../../components/forms/Tvshow'

interface AddTvshowProps
{
	tvshow: TvshowDetails
}

const AddTvshow: React.FC<AddTvshowProps> = ({tvshow}) =>
{
	if (!tvshow)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<div>
			<TvshowForm
				tvshow={tvshow}
				method='post'
			/>
		</div>
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

export default AddTvshow