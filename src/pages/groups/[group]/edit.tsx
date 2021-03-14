import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

import SEOHead from '../../../components/SEOHead'
import GroupForm from '../../../components/forms/Group'
import {GroupRaw, defaultGroupRaw} from '../../../models/group'
import api from '../../../services/api'

const EditGroup: React.FC = () =>
{
	const {query} = useRouter()
	const {group: urlId} = query

	const [group, setGroup] = useState<GroupRaw>(defaultGroupRaw)

	useEffect(() =>
	{
		api.get(`groups/${urlId}/raw`)
			.then(({data}:{data: GroupRaw}) =>
			{
				setGroup(data)
			})
	}, [])

	return (
		<div className='page' >
			<SEOHead
				title='Edit group | Cinephix'
			/>

			<GroupForm
				method='put'
				group={group}
			/>
		</div>
	)
}

export default EditGroup