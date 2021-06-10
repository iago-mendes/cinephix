import {useEffect, useState} from 'react'

import Loading from '../../../../components/Loading'
import MovieForm from '../../../../components/forms/Movie'
import RemoveButton from '../../../../components/RemoveButton'
import SEOHead from '../../../../components/SEOHead'
import { useRouter } from 'next/router'
import useUser from '../../../../hooks/useUser'

const EditMovie: React.FC = () =>
{
	const {user} = useUser()
	const {query} = useRouter()

	const {movie} = query

	const [removeRoute, setRemoveRoute] = useState('')

	useEffect(() =>
	{
		if (user && movie)
			setRemoveRoute(`/users/${user.email}/movies/${movie}`)
	}, [user, movie])

	if (!movie || Number.isNaN(Number(movie)))
		return <Loading style={{marginTop: 'auto', marginBottom: 'auto'}} />

	return (
		<div
			style={{position: 'relative'}}
			className='page'
		>
			<SEOHead
				title='Edit movie | Cinephix'
			/>

			<RemoveButton
				collection='movies'
				apiRoute={removeRoute}
			/>

			<MovieForm
				method='put'
			/>
		</div>
	)
}

export default EditMovie