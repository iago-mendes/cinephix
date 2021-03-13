import Image from 'next/image'
import {GetStaticPaths, GetStaticProps} from 'next'
import {SwiperSlide} from 'swiper/react'

import SEOHead from '../../components/SEOHead'
import Container from '../../styles/pages/groups/[group]'
import GroupInterface, {GroupListed} from '../../models/group'
import getBanner from '../../utils/getBanner'
import api from '../../services/api'
import Carousel from '../../components/Carousel'
import truncateText from '../../utils/truncateText'

interface GroupProps
{
	group: GroupInterface
}

const Group: React.FC<GroupProps> = ({group}) =>
{
	return (
		<Container className='page' >
			<SEOHead
				title={`${group.nickname} | Cinephix`}
			/>

			<header>
				<div className='img' >
					<Image src={getBanner(group.banner)} width={1500} height={750} layout='responsive' />
				</div>
			</header>

			<section className='group'>
				<h1 className='nickname' >
					{group.nickname}
				</h1>

				<p className='description' >
					{group.description}
				</p>
			</section>

			<section className='participants'>
				<h2>Participants</h2>
				<Carousel className='carousel' >
					{group.participants.map((participant, index) => (
						<SwiperSlide key={index} >
							<div className={participant.isOwner ? 'participant owner' : 'participant'} >
								<div className='img'>
									<Image src={participant.image} width={100} height={100} layout='responsive' />
								</div>
								<div className='info'>
									<span className='name' >
										{truncateText(participant.name, 20)}
									</span>
									<span>
										{truncateText(participant.email, 15)}
									</span>
									{participant.isOwner && (
										<span>
											Group owner
										</span>
									)}
								</div>
							</div>
						</SwiperSlide>
					))}
				</Carousel>
			</section>
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