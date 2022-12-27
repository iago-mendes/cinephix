import {useCallback, useEffect, useState} from 'react'
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
	resetServerContext
} from 'react-beautiful-dnd'
import {GetServerSideProps} from 'next'
import {BiQuestionMark} from 'react-icons/bi'
import {useRouter} from 'next/router'
import {Trans, t} from '@lingui/macro'

import Container from '../../../styles/pages/user/tvshows/index'
import api from '../../../services/api'
import {useAuth} from '../../../hooks/useAuth'
import UserTvshowModal from '../../../components/_modals/UserTvshow'
import {FiPlus} from 'react-icons/fi'
import SelectTvshow from '../../../components/_modals/_select/SelectTvshow'
import SEOHead from '../../../components/SEOHead'
import {
	defaultUserTvshowListed,
	loadingUserTvshowListed,
	UserTvshowListed
} from '../../../models/userTvshow'
import infoAlert from '../../../utils/alerts/info'
import SortTvshowsModal from '../../../components/_modals/SortTvshows'
import LoadingModal from '../../../components/_modals/Loading'
import HorizontalAd from '../../../components/_ads/Horizontal'
import {getStatusOptions} from '../../../assets/db/statusOptions'
import {getStatusInfo} from '../../../assets/db/statusInfo'
import {UserMediaCard} from '../../../components/_cards/UserMedia'

export interface TvshowList {
	[status: string]: UserTvshowListed[]
}

const loadingTvshows: UserTvshowListed[] = Array(3).fill(
	loadingUserTvshowListed
)

const defaultTvshowList: TvshowList = {
	watchList: loadingTvshows,
	watching: loadingTvshows,
	waiting: loadingTvshows,
	completed: loadingTvshows,
	stopped: loadingTvshows,
	paused: loadingTvshows
}

const UserTvshows: React.FC = () => {
	const {user} = useAuth()
	const {locale: language} = useRouter()
	const statusOptions = getStatusOptions()
	const statusInfo = getStatusInfo()

	const [tvshowList, setTvshowList] = useState<TvshowList>(defaultTvshowList)
	const [loading, setLoading] = useState(false)

	const [isTvshowModalOpen, setIsTvshowModalOpen] = useState(false)
	const [selectedTvshow, setSelectedTvshow] = useState<UserTvshowListed>(
		defaultUserTvshowListed
	)
	const [isSelectTvshowOpen, setIsSelectTvshowOpen] = useState(false)
	const [selectedStatusKey, setSelectedStatusKey] = useState('')

	const updateTvshowList = useCallback(async () => {
		if (!user || !user.email) return setTvshowList(defaultTvshowList)

		await api
			.get(`users/${user.email}/tvshows`, {params: {language}})
			.then(({data}) => setTvshowList(data))
			.catch(error => {
				console.log('<< error >>', error)
				setTvshowList(defaultTvshowList)
			})

		setLoading(false)
	}, [language, user])

	useEffect(() => {
		updateTvshowList()
	}, [updateTvshowList, user])

	function handleDragDrop(res: DropResult) {
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
		const data = {
			status: newStatus,
			statusIndex: newIndex
		}
		api.put(`users/${user.email}/tvshows/${tvshowId}`, data)
	}

	function handleCardClick(tvshow: UserTvshowListed) {
		setSelectedTvshow(tvshow)
		setIsTvshowModalOpen(true)
	}

	function handleAddClick(statusKey: string) {
		setSelectedStatusKey(statusKey)
		setIsSelectTvshowOpen(true)
	}

	function handleShowStatusInfo(statusKey: string) {
		infoAlert(`Status: ${statusOptions[statusKey]}`, statusInfo[statusKey])
	}

	return (
		<Container className="page">
			<SEOHead title={t`My TV shows` + ' | Cinephix'} />

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

			<LoadingModal isOpen={loading} />

			<HorizontalAd />

			<main>
				<DragDropContext onDragEnd={handleDragDrop}>
					<div className="dragDropArea">
						{Object.entries(statusOptions).map(([statusKey, statusTitle]) => {
							const tvshows = tvshowList[statusKey]

							return (
								<div key={statusKey} className="statusColumn">
									<header>
										<div className="group">
											<h1>
												{statusTitle} ({tvshows.length})
											</h1>
											<div className="buttons">
												<button
													title={t`Status information`}
													onClick={() => handleShowStatusInfo(statusKey)}
												>
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
												<button
													title={t`Add a TV show`}
													onClick={() => handleAddClick(statusKey)}
												>
													<FiPlus size={20} />
												</button>
											</div>
										</div>
									</header>
									<Droppable droppableId={statusKey}>
										{provided => (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												className="droppableArea"
											>
												{tvshows.map((tvshow, index) => {
													if (tvshow)
														return (
															<Draggable
																draggableId={String(tvshow.id)}
																index={index}
																key={tvshow.id < 0 ? index : tvshow.id}
															>
																{provided => (
																	<div
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		ref={provided.innerRef}
																		onClick={() => handleCardClick(tvshow)}
																	>
																		<UserMediaCard media={tvshow} />
																	</div>
																)}
															</Draggable>
														)
												})}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
									<button
										className="add"
										onClick={() => handleAddClick(statusKey)}
									>
										<FiPlus size={25} />
										<span>
											<Trans>Add a TV show</Trans>
										</span>
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

export const getServerSideProps: GetServerSideProps = async () => {
	resetServerContext()

	return {
		props: {}
	}
}

export default UserTvshows
