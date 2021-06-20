import SEOHead from '../../components/SEOHead'
import {FiPlus} from 'react-icons/fi'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'

import Container from '../../styles/pages/groups/index'
import {GroupListed} from '../../models/group'
import useUser from '../../hooks/useUser'
import api from '../../services/api'
import truncateText from '../../utils/truncateText'
import Link from 'next/link'
import HorizontalAd from '../../components/ads/Horizontal'

const Groups: React.FC = () =>
{
	const {user} = useUser()
	const {push, locale: language} = useRouter()

	const [groups, setGroups] = useState<GroupListed[]>([])

	useEffect(() =>
	{
		if (user)
			api.get(`groups/participants/${user.email}`, {params: {language}})
				.then(({data}:{data: GroupListed[]}) =>
				{
					setGroups(data)
				})
	}, [user])

	return (
		<Container className='page' >
			<SEOHead
				title='My groups | Cinephix'
			/>

			<HorizontalAd />

			<header>
				<h1>My groups</h1>
			</header>

			<main>
				<button className='add' title='Create a group' onClick={() => push('/groups/create')} >
					<FiPlus size={30} />
				</button>
				{groups.map((group, index) => (
					<Link href={`/groups/${group.urlId}`} key={index} >
						<a className='group' >
							<span className='nickname'>
								{truncateText(group.nickname, 20)}
							</span>
							<p className='description'>
								{truncateText(group.description, 35)}
							</p>
							<div className='event'>
								<svg width={30} height={30}>
									<rect width={30} height={30} fill={group.event.color} />
								</svg>
								<span className='name'>
									{group.event.name}
								</span>
							</div>
						</a>
					</Link>
				))}
			</main>
		</Container>
	)
}

export default Groups