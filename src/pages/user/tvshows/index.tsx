import {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult, resetServerContext} from 'react-beautiful-dnd'
import Image from 'next/image'
import {GetServerSideProps} from 'next'
import {BiQuestionMark, BiSort} from 'react-icons/bi'

import Container from '../../../styles/pages/user/tvshows/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import UserTvshowModal, {defaultTvshow, Tvshow} from '../../../components/modals/UserTvshow'
import {FiPlus} from 'react-icons/fi'
import SelectTvshow from '../../../components/modals/SelectTvshow'
import getTotalRating from '../../../utils/getTotalRating'
import SEOHead from '../../../components/SEOHead'
import truncateText from '../../../utils/truncateText'

interface TvshowList
{
	[status: string]: Tvshow[]
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

	const [tvshowList, setTvshowList] = useState<TvshowList>(
		{
			watchList: [],
			watching: [],
			waiting: [],
			completed: [],
			stopped: [],
			paused: []
		})

	const [isTvshowModalOpen, setIsTvshowModalOpen] = useState(false)
	const [selectedTvshow, setSelectedTvshow] = useState<Tvshow>(defaultTvshow)
	const [isSelectTvshowOpen, setIsSelectTvshowOpen] = useState(false)
	const [selectedStatusKey, setSelectedStatusKey] = useState('')

	useEffect(() =>
	{
		async function getTvshowList()
		{
			if (user)
			{
				const {data}:{data: TvshowList} = await api.get(`users/${user.email}/tvshows`)
				setTvshowList(data)
			}
		}

		getTvshowList()
	}, [user])

	function handleDragDrop(res: DropResult)
	{
		const tmpTvshowList = {...tvshowList}
		const tvshows: Tvshow[] = [].concat(...Object.values(tvshowList))

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

	function handleCardClick(tvshow: Tvshow)
	{
		setSelectedTvshow(tvshow)
		setIsTvshowModalOpen(true)
	}

	function handleAddClick(statusKey: string)
	{
		setSelectedStatusKey(statusKey)
		setIsSelectTvshowOpen(true)
	}

	return (
		<Container>
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
												<div className='statusInfo'>
													<button
														title='Status information'
													>
														<BiQuestionMark size={20} />
													</button>
												</div>
												<div className='sort'>
													<button
														title='Sort TV shows'
													>
														<BiSort size={20} />
													</button>
												</div>
											</div>
										</div>
									</header>
									<Droppable droppableId={statusKey} >
										{provided => (
											<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
												{tvshows.map((tvshow, index) =>
												{
													if (tvshow)
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