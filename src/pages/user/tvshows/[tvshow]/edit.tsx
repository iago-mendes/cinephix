import {useEffect, useState} from 'react'

import Loading from '../../../../components/Loading'
import TvshowForm from '../../../../components/forms/Tvshow'
import useUser from '../../../../hooks/useUser'
import RemoveButton from '../../../../components/RemoveButton'
import SEOHead from '../../../../components/SEOHead'
import { useRouter } from 'next/router'

const EditTvshow: React.FC = () =>
{
	const {user} = useUser()
	const {query} = useRouter()

	const {tvshow} = query

	const [removeRoute, setRemoveRoute] = useState('')

	useEffect(() =>
	{
		if (user)
			setRemoveRoute(`/users/${user.email}/tvshows/${tvshow}`)
	}, [user])

	if (!tvshow || Number.isNaN(Number(tvshow)))
		return <Loading style={{marginTop: 'auto', marginBottom: 'auto'}} />

	return (
		<div
			style={{position: 'relative'}}
			className='page'
		>
			<SEOHead
				title='Edit TV show | Cinephix'
			/>

			<RemoveButton
				title={'tvshow.title'}
				collection='TV shows'
				apiRoute={removeRoute}
			/>

			<TvshowForm
				method='put'
			/>
		</div>
	)
}

export default EditTvshow