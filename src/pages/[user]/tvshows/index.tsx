import Head from 'next/head'
import { useState } from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import Container, {TvshowListContainer, TvshowContainer} from '../../../styles/pages/[user]/tvshows/index'

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
	})
	const [statusList, setStatusList] = useState<Status[]>(
	[
		{title: 'Watch list', tvshowIds: [1, 2]},
		{title: 'Watching', tvshowIds: []},
		{title: 'Waiting', tvshowIds: []},
		{title: 'Completed', tvshowIds: []},
		{title: 'Stopped', tvshowIds: []},
		{title: 'Paused', tvshowIds: []}
	])

	return (
		<Container>
			<Head>
				<title>User TV shows</title>
			</Head>

			<DragDropContext
				onDragEnd={res => {}}
			>
				{statusList.map(status => (
					<div key={status.title} >
						<h1>{status.title}</h1>
						<Droppable droppableId={status.title} >
							{provided => (
								<div {...provided.droppableProps} ref={provided.innerRef} >
									{status.tvshowIds.map((id, index) =>
									{
										const tvshow = tvshowsList[id]

										return (
											<Draggable draggableId={String(id)} index={index} key={id} >
												{provided => (
													<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
														<span>{tvshow.data.title}</span>
													</div>
												)}
											</Draggable>
										)
									})}
								</div>
							)}
						</Droppable>
					</div>
				))}
			</DragDropContext>
		</Container>
	)
}

export default UserTvshows