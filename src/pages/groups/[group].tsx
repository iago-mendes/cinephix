import Image from 'next/image'
import {GetStaticPaths, GetStaticProps} from 'next'

import SEOHead from '../../components/SEOHead'
import Container from '../../styles/pages/groups/[group]'
import GroupInterface, {GroupListed} from '../../models/group'
import getBanner from '../../utils/getBanner'
import api from '../../services/api'

interface GroupProps
{
	group: GroupInterface
}

const Group: React.FC<GroupProps> = ({group}) =>
{
	return (
		<Container className='page' >
			<SEOHead
				title='group'
			/>

			<header>
				<div className='img' >
					<Image src={getBanner(group.banner)} width={1500} height={750} layout='responsive' />
				</div>
			</header>
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () =>
{
	const {data: groups}:{data: GroupListed[]} = await api.get('groups')

	const paths = groups.map(group => (
		{
			params: {group: String(group.urlId)}
		}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx =>
{
	const {group: urlId} = ctx.params

	const {data: group}:{data: GroupInterface} = await api.get(`groups/${urlId}`)

	return {
		props: {group},
		revalidate: 5
	}
}

export default Group