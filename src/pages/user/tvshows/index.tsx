import Head from 'next/head'
import {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'
import Image from 'next/image'

import Container from '../../../styles/pages/user/tvshows/index'
import api from '../../../services/api'
import Loading from '../../../components/Loading'
import NotSigned from '../../../components/NotSigned'
import useUser from '../../../hooks/useUser'
import UserTvshowModal, {defaultTvshow, Tvshow} from '../../../components/modals/UserTvshow'
import {FiPlus} from 'react-icons/fi'
import SelectTvshow from '../../../components/modals/SelectTvshow'
import getTotalRating from '../../../utils/getTotalRating'

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
	const {user, loading} = useUser()

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
		let tmpTvshowList = {...tvshowList}
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

	if (loading)
		return <Loading />
	if (!user)
		return <NotSigned />

	return (
		<Container>
			<Head>
				<title>User TV shows</title>
			</Head>

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
									<h1>{statusTitle}</h1>
									<div className='scroll'>
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
																				<h2>{tvshow.title}</h2>
																				<div className='details'>
																					{
																						Object.values(tvshow.ratings).length !== 0 && (
																							<span className='ratings'>
																								{getTotalRating(tvshow.ratings, true, 13)} ({getTotalRating(tvshow.ratings)})
																							</span>
																						)
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
									</div>
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

export default UserTvshows