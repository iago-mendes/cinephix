import Head from 'next/head'
import { useState } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import Container from '../../../styles/pages/user/tvshows/index'

interface TvshowList
{
	[id: number]:
	{
		data:
		{
			// id: number
			// image: string
			title: string
			// overview: string
			// date: string
		}
		// status: string
		// venue: string
		// ratings:
		// {
		// 	engagement: number
		// 	consistency: number
		// 	screenplay: number
		// 	acting: number
		// 	cinematography: number
		// 	musicAndSound: number
		// }
	}
}

interface Status
{
	title: string
	tvshowIds: number[]
}

const UserTvshows: React.FC = () =>
{
	const [tvshowsList, setTvshowsList] = useState<TvshowList>(
	{
		1: {data: {title: 'This is a text 1'}},
		2: {data: {title: 'This is a text 2'}},
		3: {data: {title: 'This is a text 3'}},
		4: {data: {title: 'This is a text 4'}},
	})
	const [statusList, setStatusList] = useState<Status[]>(
	[
		{title: 'Watch list', tvshowIds: [1, 2]},
		{title: 'Watching', tvshowIds: []},
		{title: 'Waiting', tvshowIds: [3]},
		{title: 'Completed', tvshowIds: []},
		{title: 'Stopped', tvshowIds: [4]},
		{title: 'Paused', tvshowIds: []}
	])

	return (
		<Container>
			<Head>
				<title>User TV shows</title>
			</Head>

			<main>
				<DragDropContext
					onDragEnd={res => {}}
				>
					<div className="dragDropArea">
						{statusList.map(status => (
							<div key={status.title} className='statusColumn' >
								<h1>{status.title}</h1>
								<Droppable droppableId={status.title} >
									{provided => (
										<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
											{status.tvshowIds.map((id, index) =>
											{
												const tvshow = tvshowsList[id]

												return (
													<Draggable draggableId={String(id)} index={index} key={id} >
														{provided => (
															<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='tvshow' >
																<span>{tvshow.data.title}</span>
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