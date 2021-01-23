import {GetStaticPaths, GetStaticProps} from 'next'
import {useEffect, useState} from 'react'

import api from '../../../../services/api'
import {Media} from '../../../../components/MediaCard'
import TvshowDetails from '../../../../models/tvshow'
import Loading from '../../../../components/Loading'
import TvshowForm from '../../../../components/forms/Tvshow'
import UserTvshow, {defaultUserTvshow} from '../../../../models/userTvshow'
import useUser from '../../../../hooks/useUser'

interface EditTvshowProps
{
	tvshow: TvshowDetails
}

const EditTvshow: React.FC<EditTvshowProps> = ({tvshow}) =>
{
	const {user} = useUser()

	const [userTvshow, setUserTvshow] = useState<UserTvshow>(defaultUserTvshow)

	useEffect(() =>
	{
		if (user && tvshow)
			api.get(`users/${user.email}/tvshows/${tvshow.id}`)
				.then(({data}:{data: UserTvshow}) => setUserTvshow(data))
	}, [user, tvshow])

	if (!tvshow)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<div>
			<TvshowForm
				tvshow={tvshow}
				method='put'
				userTvshow={userTvshow}
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

export default EditTvshow