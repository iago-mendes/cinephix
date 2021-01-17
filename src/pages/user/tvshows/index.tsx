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
	data:
	{
		id: number
		image: string
		title: string
		overview: string
		date: string
	}
	status: string
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
	[id: number]: Tvshow
}

interface Status
{
	title: string
	tvshowIds: number[]
}

const UserTvshows: React.FC = () =>
{
	const {user, loading} = useUser()

	const [tvshowList, setTvshowList] = useState<TvshowList>({})
	const [statusList, setStatusList] = useState<Status[]>(
	[
		{title: 'Watch list', tvshowIds: []},
		{title: 'Watching', tvshowIds: []},
		{title: 'Waiting', tvshowIds: []},
		{title: 'Completed', tvshowIds: []},
		{title: 'Stopped', tvshowIds: []},
		{title: 'Paused', tvshowIds: []}
	])

	useEffect(() =>
	{
		async function getTvshows()
		{
			if (user)
			{
				const {data: tvshows}:{data: Tvshow[]} = await api.get(`users/${user.email}/tvshows`)

				let tmpTvshowList: TvshowList = {}
				let tmpStatusList: Status[] =
				[
					{title: 'Watch list', tvshowIds: []},
					{title: 'Watching', tvshowIds: []},
					{title: 'Waiting', tvshowIds: []},
					{title: 'Completed', tvshowIds: []},
					{title: 'Stopped', tvshowIds: []},
					{title: 'Paused', tvshowIds: []}
				]

				tvshows.map(tvshow =>
				{
					tmpTvshowList[tvshow.data.id] = tvshow

					if (tvshow.status === 'Watch list')
						tmpStatusList[0].tvshowIds.push(tvshow.data.id)
					if (tvshow.status === 'Watching')
						tmpStatusList[1].tvshowIds.push(tvshow.data.id)
					if (tvshow.status === 'Waiting')
						tmpStatusList[2].tvshowIds.push(tvshow.data.id)
					if (tvshow.status === 'Completed')
						tmpStatusList[3].tvshowIds.push(tvshow.data.id)
					if (tvshow.status === 'Stopped')
						tmpStatusList[4].tvshowIds.push(tvshow.data.id)
					if (tvshow.status === 'Paused')
						tmpStatusList[5].tvshowIds.push(tvshow.data.id)
				})

				setTvshowList(tmpTvshowList)
				setStatusList(tmpStatusList)
			}
		}

		getTvshows()
	}, [user])

	function handleDragDrop(res: DropResult)
	{
		let tmpStatusList = [...statusList]

		const tvshowId = Number(res.draggableId)

		const previousStatus = Number(res.source.droppableId)
		tmpStatusList[previousStatus].tvshowIds = tmpStatusList[previousStatus].tvshowIds
			.filter(id => id !== tvshowId)
		
		const newStatus = Number(res.destination.droppableId)
		tmpStatusList[newStatus].tvshowIds
			.push(tvshowId)

		const data =
		{
			status: statusList[newStatus].title
		}
		api.put(`users/${user.email}/tvshows/${tvshowId}`, data)
		setStatusList(tmpStatusList)
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
						{statusList.map((status, index) => (
							<div key={index} className='statusColumn' >
								<h1>{status.title}</h1>
								<Droppable droppableId={String(index)} >
									{provided => (
										<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
											{status.tvshowIds.map((id, index) =>
											{
												const tvshow = tvshowList[id]

												return (
													<Draggable draggableId={String(id)} index={index} key={id} >
														{provided => (
															<div
																className='tvshow'
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
															>
																<div className='img'>
																	<Image src={tvshow.data.image} width={780} height={1170} layout='responsive'/>
																</div>
																<div className='info'>
																	<h2>{tvshow.data.title}</h2>
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
												)
											})}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</div>
						))}
					</div>
				</DragDropContext>
			</main>
		</Container>
	)
}

export default UserTvshows