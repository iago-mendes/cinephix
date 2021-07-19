import {useEffect, useState} from 'react'
import {t} from '@lingui/macro'

import Loading from '../../../../components/Loading'
import TvshowForm from '../../../../components/_forms/Tvshow'
import {useAuth} from '../../../../hooks/useAuth'
import RemoveButton from '../../../../components/RemoveButton'
import SEOHead from '../../../../components/SEOHead'
import {useRouter} from 'next/router'

const EditTvshow: React.FC = () => {
	const {user} = useAuth()
	const {query} = useRouter()

	const {tvshow} = query

	const [removeRoute, setRemoveRoute] = useState('')

	useEffect(() => {
		if (user) setRemoveRoute(`/users/${user.email}/tvshows/${tvshow}`)
	}, [user])

	if (!tvshow || Number.isNaN(Number(tvshow)))
		return <Loading style={{marginTop: 'auto', marginBottom: 'auto'}} />

	return (
		<div style={{position: 'relative'}} className="page">
			<SEOHead title={t`Edit TV show` + ' | Cinephix'} />

			<RemoveButton collection="TV shows" apiRoute={removeRoute} />

			<TvshowForm method="put" />
		</div>
	)
}

export default EditTvshow
