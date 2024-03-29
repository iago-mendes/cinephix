import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

import SEOHead from '../../../components/SEOHead'
import GroupForm from '../../../components/_forms/Group'
import {GroupRaw, defaultGroupRaw} from '../../../models/group'
import api from '../../../services/api'
import RemoveButton from '../../../components/RemoveButton'

const EditGroup: React.FC = () => {
	return null
	const {query} = useRouter()
	const {group: urlId} = query

	const [group, setGroup] = useState<GroupRaw>(defaultGroupRaw)

	useEffect(() => {
		api.get(`groups/${urlId}/raw`).then(({data}: {data: GroupRaw}) => {
			setGroup(data)
		})
	}, [urlId])

	return (
		<div className="page" style={{position: 'relative'}}>
			<SEOHead title="Edit group | Cinephix" />

			<RemoveButton
				title={group.nickname}
				collection="groups"
				apiRoute={`groups/${urlId}`}
				redirectRoute="/groups"
			/>

			<GroupForm method="put" group={group} />
		</div>
	)
}

export default EditGroup
