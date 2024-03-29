import {useEffect, useState} from 'react'
import {t} from '@lingui/macro'

import Loading from '../../../../components/Loading'
import MovieForm from '../../../../components/_forms/Movie'
import RemoveButton from '../../../../components/RemoveButton'
import SEOHead from '../../../../components/SEOHead'
import {useRouter} from 'next/router'
import {useAuth} from '../../../../hooks/useAuth'

const EditMovie: React.FC = () => {
	const {user} = useAuth()
	const {query} = useRouter()

	const {movie} = query

	const [removeRoute, setRemoveRoute] = useState('')

	useEffect(() => {
		if (user && movie) setRemoveRoute(`/users/${user.email}/movies/${movie}`)
	}, [user, movie])

	if (!movie || Number.isNaN(Number(movie)))
		return <Loading style={{marginTop: 'auto', marginBottom: 'auto'}} />

	return (
		<div style={{position: 'relative'}} className="page">
			<SEOHead title={t`Edit movie` + ' | Cinephix'} />

			<RemoveButton collection="movies" apiRoute={removeRoute} />

			<MovieForm method="put" />
		</div>
	)
}

export default EditMovie
