import {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult, resetServerContext} from 'react-beautiful-dnd'
import Image from 'next/image'
import {GetServerSideProps} from 'next'
import {BiQuestionMark} from 'react-icons/bi'

import Container from '../../../styles/pages/user/tvshows/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import UserTvshowModal from '../../../components/modals/UserTvshow'
import {FiPlus} from 'react-icons/fi'
import SelectTvshow from '../../../components/modals/SelectTvshow'
import getTotalRating from '../../../utils/getTotalRating'
import SEOHead from '../../../components/SEOHead'
import truncateText from '../../../utils/truncateText'
import {defaultUserTvshowListed, loadingUserTvshowListed, statusInfo, UserTvshowListed} from '../../../models/userTvshow'
import infoAlert from '../../../utils/alerts/info'
import SortTvshowsModal from '../../../components/modals/SortTvshows'
import LoadingModal from '../../../components/modals/Loading'
import HorizontalAd from '../../../components/ads/Horizontal'
import { SkeletonLoading } from '../../../utils/skeletonLoading'

export interface TvshowList
{
	[status: string]: UserTvshowListed[]
}

const loadingTvshows: UserTvshowListed[] = Array(3).fill(loadingUserTvshowListed)

const defaultTvshowList: TvshowList =
{
	watchList: loadingTvshows,
	watching: loadingTvshows,
	waiting: loadingTvshows,
	completed: loadingTvshows,
	stopped: loadingTvshows,
	paused: loadingTvshows
}

const validStatus: {[statusKey: string]: string} = 
{
	watchList: 'Watch list',
	watching: 'Watching',
	waiting: 'Waiting',
	completed: 'Completed',
	stopped: 'Stopped',
	paused: 'Paused'
}

const UserTvshows: React.FC = () =>
{
	const {user} = useUser()

	const [tvshowList, setTvshowList] = useState<TvshowList>(defaultTvshowList)
	const [loading, setLoading] = useState(false)

	const [isTvshowModalOpen, setIsTvshowModalOpen] = useState(false)
	const [selectedTvshow, setSelectedTvshow] = useState<UserTvshowListed>(defaultUserTvshowListed)
	const [isSelectTvshowOpen, setIsSelectTvshowOpen] = useState(false)
	const [selectedStatusKey, setSelectedStatusKey] = useState('')

	useEffect(() =>
	{
		updateTvshowList()
	}, [user])

	async function updateTvshowList()
	{
		if (!user || !user.email)
			return setTvshowList(defaultTvshowList)
		
		await api.get(`users/${user.email}/tvshows`)
			.then(({data}) => setTvshowList(data))
			.catch(error =>
			{
				console.log('<< error >>', error)
				setTvshowList(defaultTvshowList)
			})
		
		setLoading(false)
	}

	function handleDragDrop(res: DropResult)
	{
		const tmpTvshowList = {...tvshowList}
		const tvshows: UserTvshowListed[] = [].concat(...Object.values(tvshowList))

		const previousStatus = res.source.droppableId
		const previousIndex = res.source.index
		tmpTvshowList[previousStatus].splice(previousIndex, 1)
		
		const tvshowId = Number(res.draggableId)
		const tvshow = tvshows.find(({id}) => id === tvshowId)
		
		const newStatus = res.destination.droppableId
		const newIndex = res.destination.index
		tmpTvshowList[newStatus].splice(newIndex, 0, tvshow)

		setTvshowList(tmpTvshowList)
		const data =
		{
			status: newStatus,
			statusIndex: newIndex
		}
		api.put(`users/${user.email}/tvshows/${tvshowId}`, data)
	}

	function handleCardClick(tvshow: UserTvshowListed)
	{
		setSelectedTvshow(tvshow)
		setIsTvshowModalOpen(true)
	}

	function handleAddClick(statusKey: string)
	{
		setSelectedStatusKey(statusKey)
		setIsSelectTvshowOpen(true)
	}

	function handleShowStatusInfo(statusKey: string)
	{
		infoAlert(`Status: ${validStatus[statusKey]}`, statusInfo[statusKey])
	}

	return (
		<Container className='page' >
			<SEOHead
				title='My TV shows | Cinephix'
			/>

			<UserTvshowModal
				isOpen={isTvshowModalOpen}
				setIsOpen={setIsTvshowModalOpen}
				tvshow={selectedTvshow}
			/>

			<SelectTvshow
				isOpen={isSelectTvshowOpen}
				setIsOpen={setIsSelectTvshowOpen}
				statusKey={selectedStatusKey}
			/>

			<LoadingModal
				isOpen={loading}
			/>

			<HorizontalAd />

			<main>
				<DragDropContext
					onDragEnd={handleDragDrop}
				>
					<div className='dragDropArea'>
						{Object.entries(validStatus).map(([statusKey, statusTitle]) =>
						{
							const tvshows = tvshowList[statusKey]

							return (
								<div key={statusKey} className='statusColumn' >
									<header>
										<div className='group'>
											<h1>{statusTitle} ({tvshows.length})</h1>
											<div className='buttons'>
												<button title='Status information' onClick={() => handleShowStatusInfo(statusKey)} >
													<BiQuestionMark size={20} />
												</button>
												<SortTvshowsModal
													statusKey={statusKey}
													statusTvshows={tvshows}
													tvshowList={tvshowList}
													setTvshowList={setTvshowList}
													revalidate={updateTvshowList}
													setLoading={setLoading}
												/>
												<button title='Add a TV show' onClick={() => handleAddClick(statusKey)}>
													<FiPlus size={20} />
												</button>
											</div>
										</div>
									</header>
									<Droppable droppableId={statusKey} >
										{provided => (
											<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
												{tvshows.map((tvshow, index) =>
												{
													if (tvshow.id < 0)
														return (
															<div
																className='tvshow'
															>
																<div className='img'>
																	<SkeletonLoading opacity={0.75} />
																</div>
																<div className='info'>
																	<h2>
																		<SkeletonLoading height='3rem' opacity={0.75} />
																	</h2>
																	<div className='details'>
																		<span className='venue'>
																			<SkeletonLoading height='1.5rem' width='50%' opacity={0.75} />
																		</span>
																	</div>
																</div>
															</div>
														)
													else if (tvshow)
														return (
															<Draggable
																draggableId={String(tvshow.id)}
																index={index}
																key={tvshow.id}
															>
																{provided => (
																	<div
																		className='tvshow'
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		ref={provided.innerRef}
																		onClick={() => handleCardClick(tvshow)}
																	>
																		<div className='img'>
																			<Image src={tvshow.image} width={780} height={1170} layout='responsive'/>
																		</div>
																		<div className='info'>
																			<h2>{truncateText(tvshow.title, 35)}</h2>
																			<div className='details'>
																				{
																					Object.values(tvshow.ratings).length !== 0 && getTotalRating(tvshow.ratings, true)
																				}
																				<span className='venue'>{tvshow.venue}</span>
																			</div>
																		</div>
																	</div>
																)}
															</Draggable>
														)
												})}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
									<button className='add' onClick={() => handleAddClick(statusKey)}>
										<FiPlus size={25} />
										<span>Add a TV show</span>
									</button>
								</div>
							)
						})}
					</div>
				</DragDropContext>
			</main>
		</Container>
	)
}

export const getServerSideProps: GetServerSideProps = async () =>
{
	resetServerContext()

	return {
		props: {}
	}
}

export default UserTvshows