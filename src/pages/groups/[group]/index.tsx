import Image from 'next/image'
import {GetStaticPaths, GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

import SEOHead from '../../../components/SEOHead'
import Container from '../../../styles/pages/groups/[group]'
import GroupInterface, {
	GroupListed,
	GroupParticipant
} from '../../../models/group'
import getBanner from '../../../utils/getBanner'
import api from '../../../services/api'
import {Carousel} from '../../../components/Carousel'
import truncateText from '../../../utils/truncateText'
import Loading from '../../../components/Loading'
import {EventMediaCard} from '../../../components/_cards/EventMedia'
import {EventCelebrityCard} from '../../../components/_cards/EventCelebrity'
import {useAuth} from '../../../hooks/useAuth'
import Link from 'next/link'
import MakePredictionsModal from '../../../components/_modals/MakePredictions'
import ParticipantPredictionsModal from '../../../components/_modals/ParticipantPredictions'
import WinnerSign from '../../../components/WinnerSign'

interface GroupProps {
	group: GroupInterface
}

const Group: React.FC<GroupProps> = ({group: staticGroup}) => {
	return null
	const {user} = useAuth()
	const {isFallback, push, pathname} = useRouter()

	const [group, setGroup] = useState<GroupInterface>(staticGroup)
	const [isOwner, setIsOwner] = useState(false)

	const [isMakePredictionsOpen, setIsMakePredictionsOpen] = useState(false)
	const [isParticipantPredictionsOpen, setIsParticipantPredictionsOpen] =
		useState(false)
	const [selectedParticipant, setSelectedParticipant] =
		useState<GroupParticipant>(group && group.participants[0])

	useEffect(() => {
		if (user && group) {
			const participant = group.participants.find(
				({email}) => email === user.email
			)

			if (!participant) push('/groups')
			else setIsOwner(participant.isOwner)
		}
	}, [user, group, push])

	useEffect(updateGroup, [group.urlId, pathname])

	function openParticipantPredictions(participant: GroupParticipant) {
		setSelectedParticipant(participant)
		setIsParticipantPredictionsOpen(true)
	}

	function updateGroup() {
		api.get(`groups/${group.urlId}`).then(({data}: {data: GroupInterface}) => {
			setGroup(data)
		})
	}

	if (isFallback) return <Loading style={{height: 'calc(100vh - 5rem)'}} />

	return (
		<Container className="page">
			<SEOHead title={`${group.nickname} | Cinephix`} />

			<MakePredictionsModal
				isOpen={isMakePredictionsOpen}
				setIsOpen={setIsMakePredictionsOpen}
				group={group}
				updateGroup={updateGroup}
			/>

			<ParticipantPredictionsModal
				isOpen={isParticipantPredictionsOpen}
				setIsOpen={setIsParticipantPredictionsOpen}
				participant={selectedParticipant}
				eventName={group.event.name}
			/>

			<header>
				<div className="img">
					<Image
						src={getBanner(group.banner)}
						alt={`${group.nickname}'s banner`}
						width={1500}
						height={750}
						layout="responsive"
					/>
				</div>
			</header>

			<section className="group">
				<h1 className="nickname">{group.nickname}</h1>

				<p className="description">{group.description}</p>
			</section>

			<section className="actions">
				{isOwner && (
					<Link href={`/groups/${group.urlId}/edit`}>Edit group</Link>
				)}
				{!group.event.status.hasResults && (
					<button
						title="Make predictions"
						onClick={() => setIsMakePredictionsOpen(true)}
					>
						Make predictions
					</button>
				)}
			</section>

			<section className="participants">
				<h2>Participants</h2>
				<Carousel numberOfItems={group.participants.length}>
					{group.participants.map(participant => (
						<div key={participant.email}>
							<div
								className="participant"
								onClick={() => openParticipantPredictions(participant)}
							>
								<div className="img">
									<Image
										src={participant.image}
										alt={`${participant.name}'s image`}
										width={100}
										height={100}
										layout="responsive"
									/>
								</div>
								<div className="info">
									<span className="name">
										{truncateText(participant.name, 20)}
									</span>
									<span>{truncateText(participant.email, 15)}</span>
									{participant.isOwner && <span>Group owner</span>}
								</div>

								{participant.isWinner === true && <WinnerSign />}

								{participant.points != undefined && (
									<div className="floatingNumber">{participant.points}</div>
								)}
							</div>
						</div>
					))}
				</Carousel>
			</section>

			<section className="event">
				<h2>{group.event.name}</h2>
				{group.event.categories.map((category, index) => (
					<div className="category" key={index}>
						<div className="header">
							<h3 className="name">{category.name}</h3>
						</div>
						<Carousel
							numberOfItems={
								category.media.length + category.celebrities.length
							}
						>
							{['movies', 'tvshows'].includes(category.type) &&
								category.media.map(media => (
									<EventMediaCard
										key={media.id}
										media={media}
										link={`/${category.type}/${media.id}`}
									>
										<div className="floatingNumber">
											{media.predictionsQuantity}
										</div>

										{media.isResult === true && <WinnerSign />}
									</EventMediaCard>
								))}
							{category.type === 'celebrities' &&
								category.celebrities.map(eventCelebrity => (
									<EventCelebrityCard
										key={eventCelebrity.celebrity.id}
										eventCelebrity={eventCelebrity}
										link={`/celebrities/${eventCelebrity.celebrity.id}`}
									>
										<div className="floatingNumber">
											{eventCelebrity.predictionsQuantity}
										</div>

										{eventCelebrity.isResult === true && <WinnerSign />}
									</EventCelebrityCard>
								))}
						</Carousel>
					</div>
				))}
			</section>
		</Container>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {data: groups}: {data: GroupListed[]} = await api.get('groups')

	const paths = groups.map(group => ({
		params: {group: String(group.urlId)}
	}))

	return {
		paths,
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ctx => {
	const {group: urlId} = ctx.params
	const language = ctx.locale

	const {data: group}: {data: GroupInterface} = await api.get(
		`groups/${urlId}`,
		{params: {language}}
	)

	return {
		props: {group},
		revalidate: 1
	}
}

export default Group
