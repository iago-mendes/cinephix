import Head from 'next/head'
import {useEffect, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'
import Image from 'next/image'
import {BsFillTriangleFill} from 'react-icons/bs'

import Container from '../../../styles/pages/user/movies/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import getTotalRating from '../../../utils/getTotalRating'
import {UserMovieListed} from '../../../models/userMovie'

const UserMovies: React.FC = () =>
{
	const {user} = useUser()

	const [movieList, setMovieList] = useState<UserMovieListed[]>([])

	useEffect(() =>
	{
		async function getMovieList()
		{
			if (user)
			{
				const {data}:{data: UserMovieListed[]} = await api.get(`users/${user.email}/movies`)
				setMovieList(data)
			}
		}

		getMovieList()
	}, [user])

	function handleDragDrop(res: DropResult)
	{
		// let tmpMovieList = {...movieList}
		// const tvshows: Tvshow[] = [].concat(...Object.values(movieList))

		// const previousStatus = res.source.droppableId
		// const previousIndex = res.source.index
		// tmpMovieList[previousStatus].splice(previousIndex, 1)
		
		// const tvshowId = Number(res.draggableId)
		// const tvshow = tvshows.find(({id}) => id === tvshowId)
		
		// const newStatus = res.destination.droppableId
		// const newIndex = res.destination.index
		// tmpMovieList[newStatus].splice(newIndex, 0, tvshow)

		// setMovieList(tmpMovieList)
		// const data =
		// {
		// 	status: newStatus,
		// 	statusIndex: newIndex
		// }
		// api.put(`users/${user.email}/tvshows/${tvshowId}`, data)
	}

	return (
		<Container>
			<Head>
				<title>User movies</title>
			</Head>

			<main>
				<DragDropContext
					onDragEnd={handleDragDrop}
				>
					<div className='dragDropArea'>
						<div className='watchList'>
							<div className="dropdown">
								<BsFillTriangleFill size={30}/>
								<span>Watch list</span>
							</div>
							<Droppable droppableId='watchList' >
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
										{movieList.filter(({watched}) => !watched).map((movie, index) =>
										{
											if (movie)
												return (
													<Draggable
														draggableId={String(movie.data.id)}
														index={index}
														key={movie.data.id}
													>
														{provided => (
															<div
																className='movie'
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
																onClick={() => {}}
															>
																<div className='img'>
																	<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
																</div>
																<div className='info'>
																	<h2>{movie.data.title}</h2>
																	<div className='details'>
																		<span className='venue'>{movie.venue}</span>
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
						<div className='watched'>
							<Droppable droppableId='watchList' >
								{provided => (
									<div {...provided.droppableProps} ref={provided.innerRef} className='droppableArea' >
										{movieList.filter(({watched}) => watched).map((movie, index) =>
										{
											if (movie)
												return (
													<Draggable
														draggableId={String(movie.data.id)}
														index={index}
														key={movie.data.id}
													>
														{provided => (
															<div
																className='movie'
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																ref={provided.innerRef}
																onClick={() => {}}
															>
																<div className='img'>
																	<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
																</div>
																<div className='info'>
																	<h2>{movie.data.title}</h2>
																	<div className='details'>
																		{
																			Object.values(movie.ratings).length !== 0 && (
																				<span className='ratings'>
																					{getTotalRating(movie.ratings, true, 13)} ({getTotalRating(movie.ratings)})
																				</span>
																			)
																		}
																		<span className='venue'>{movie.venue}</span>
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
					</div>
				</DragDropContext>
			</main>
		</Container>
	)
}

export default UserMovies