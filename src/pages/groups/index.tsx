import SEOHead from '../../components/SEOHead'
import {FiPlus} from 'react-icons/fi'
import {useEffect, useState} from 'react'

import Container from '../../styles/pages/groups/index'
import {GroupListed} from '../../models/group'
import useUser from '../../hooks/useUser'
import api from '../../services/api'

const Groups: React.FC = () =>
{
	const {user} = useUser()

	const [groups, setGroups] = useState<GroupListed[]>([])

	useEffect(() =>
	{
		if (user)
			api.get(`groups/participants/${user.email}`)
				.then(({data}:{data: GroupListed[]}) =>
				{
					setGroups(data)
				})
	}, [user])

	return (
		<Container className='page' >
			<SEOHead
				title='My movies | Cinephix'
			/>

			<header>
				<h1>My movies</h1>
			</header>

			<main>
				<button className='add' title='Add a movie' onClick={() => {}} >
					<FiPlus size={30} />
				</button>
				{groups.map((group, index) => (
					<div className='group' key={index} >
						<span className='nickname'>
							{group.nickname}
						</span>
					</div>
				))}
			</main>
		</Container>
	)
}

export default Groups