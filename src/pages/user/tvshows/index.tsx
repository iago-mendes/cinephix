import Head from 'next/head'
import {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'
import Image from 'next/image'
import {BiExpand} from 'react-icons/bi'

import Container from '../../../styles/pages/user/tvshows/index'
import api from '../../../services/api'
import Loading from '../../../components/Loading'
import NotSigned from '../../../components/NotSigned'
import useUser from '../../../hooks/useUser'

interface Tvshow
{
	id: number
	image: string
	title: string
	venue: string
	ratings:
	{
		engagement: number
		consistency: number
		screenplay: number
		acting: number
		cinematography: number
		musicAndSound: number
	}
}

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

	useEffect(() => console.log('[tvshowList]', tvshowList), [tvshowList])

	function handleDragDrop(res: DropResult)
	{
		let tmpTvshowList = {...tvshowList}
		const tvshows: Tvshow[] = [].concat(...Object.values(tvshowList))
		console.log('[tvshows]', tvshows)

		const previousStatus = res.source.droppableId
		const previousIndex = res.source.index
		tmpTvshowList[previousStatus].splice(previousIndex, 1)
		
		const tvshowId = Number(res.draggableId)
		const tvshow = tvshows.find(({id}) => id === tvshowId)
		console.log('[tvshow]', tvshow)
		
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

	if (loading)
		return <Loading />
	if (!user)
		return <NotSigned />

	return (
		<Container>
			<Head>
				<title>User TV shows</title>
			</Head>

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
									<Droppable droppableId={statusKey} >
										{provided => (
											<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
												{tvshows.map((tvshow, index) => (
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
															>
																<div className='img'>
																	<Image src={tvshow.image} width={780} height={1170} layout='responsive'/>
																</div>
																<div className='info'>
																	<h2>{tvshow.title}</h2>
																	<div className='details'>
																		<span className='ratings'>{tvshow.ratings.acting}</span>
																		<span className='venue'>{tvshow.venue}</span>
																	</div>
																</div>
																<button onClick={() => {}}>
																	<BiExpand size={20} />
																</button>
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
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