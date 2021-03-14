import Image from 'next/image'
import {GetStaticPaths, GetStaticProps} from 'next'
import {SwiperSlide} from 'swiper/react'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

import SEOHead from '../../../components/SEOHead'
import Container from '../../../styles/pages/groups/[group]'
import GroupInterface, {GroupListed, GroupParticipant} from '../../../models/group'
import getBanner from '../../../utils/getBanner'
import api from '../../../services/api'
import Carousel from '../../../components/Carousel'
import truncateText from '../../../utils/truncateText'
import Loading from '../../../components/Loading'
import EventMediaCard from '../../../components/cards/EventMedia'
import EventCelebrityCard from '../../../components/cards/EventCelebrity'
import useUser from '../../../hooks/useUser'
import Link from 'next/link'
import MakePredictionsModal from '../../../components/modals/MakePredictions'
import ParticipantPredictionsModal from '../../../components/modals/ParticipantPredictions'

interface GroupProps
{
	group: GroupInterface
}

const Group: React.FC<GroupProps> = ({group}) =>
{
	const {user} = useUser()
	const {isFallback, push} = useRouter()

	const [isOwner, setIsOwner] = useState(false)
	const [isMakePredictionsOpen, setIsMakePredictionsOpen] = useState(false)
	const [isParticipantPredictionsOpen, setIsParticipantPredictionsOpen] = useState(false)
	const [selectedParticipant, setSelectedParticipant] = useState<GroupParticipant>(group.participants[0])

	useEffect(() =>
	{
		if (user)
		{
			const participant = group.participants.find(({email}) => email === user.email)

			if (!participant)
				push('/groups')
			else
				setIsOwner(participant.isOwner)
		}
	}, [user])

	function openParticipantPredictions(participant: GroupParticipant)
	{
		setSelectedParticipant(participant)
		setIsParticipantPredictionsOpen(true)
	}

	if (isFallback)
		return <Loading style={{height: 'calc(100vh - 5rem)'}} />

	return (
		<Container className='page' >
			<SEOHead
				title={`${group.nickname} | Cinephix`}
			/>

			<MakePredictionsModal
				isOpen={isMakePredictionsOpen}
				setIsOpen={setIsMakePredictionsOpen}

				group={group}
			/>

			<ParticipantPredictionsModal
				isOpen={isParticipantPredictionsOpen}
				setIsOpen={setIsParticipantPredictionsOpen}

				participant={selectedParticipant}
				eventName={group.event.name}
				groupUrlId={group.urlId}
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

			<section className='actions'>
				{isOwner && (
					<Link href={`/groups/${group.urlId}/edit`} >
						Edit group
					</Link>
				)}
				<button title='Make predictions' onClick={() => setIsMakePredictionsOpen(true)} >
					Make predictions
				</button>
			</section>

			<section className='participants'>
				<h2>Participants</h2>
				<Carousel className='carousel' >
					{group.participants.map((participant, index) => (
						<SwiperSlide key={index} >
							<div
								className={participant.isOwner ? 'participant owner' : 'participant'}
								onClick={() => openParticipantPredictions(participant)}
							>
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

			<section className='event'>
				<h2>
					{group.event.name}
				</h2>
				{group.event.categories.map((category, index) => (
					<div className='category' key={index} >
						<div className='header'>
							<h3 className='name' >
								{category.name}
							</h3>
						</div>
						<Carousel className='carousel' >
							{['movies', 'tvshows'].includes(category.type) && category.media.map((media, index) => (
								<SwiperSlide key={index} >
									<EventMediaCard
										media={media}
										link={`/groups/${group.urlId}`}
									>
										<button className='guesses'>
											{media.participants.length}
										</button>
									</EventMediaCard>
								</SwiperSlide>
							))}
							{category.type === 'celebrities' && category.celebrities.map((eventCelebrity, index) => (
								<SwiperSlide key={index} >
									<EventCelebrityCard
										eventCelebrity={eventCelebrity}
										link={`/groups/${group.urlId}`}
									>
										<button className='guesses' title='View participants' >
											{eventCelebrity.participants.length}
										</button>
									</EventCelebrityCard>
								</SwiperSlide>
							))}
						</Carousel>
					</div>
				))}
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