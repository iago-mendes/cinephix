import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import Container from '../../styles/components/modals/Select'

import MediaCard, {Media} from '../_cards/Media'
import GridPaginate from '../GridPaginate'
import {updatePaginatedData} from '../../utils/updatePaginatedData'
import ModalContainer from './Container'
import {useUserStatus} from '../../contexts/UserStatus'

interface SelectTvshowProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	statusKey: string
}

const SelectTvshow: React.FC<SelectTvshowProps> = ({
	isOpen,
	setIsOpen,
	statusKey
}) => {
	const {typingControllerProps} = useUserStatus()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)

	const [tvshows, setTvshows] = useState<Media[]>([])

	useEffect(() => {
		updatePaginatedData({
			route: 'tvshows',
			setData: setTvshows,
			setLoading,
			search,
			page,
			setPage,
			setTotalPages
		})
	}, [search, page])

	return (
		<ModalContainer
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			display="Select a TV show"
		>
			<Container>
				<div className="search">
					<FaSearch size={25} />
					<input
						type="text"
						placeholder="Search for a TV show"
						value={search}
						onChange={e => setSearch(e.target.value)}
						autoFocus
						maxLength={100}
						{...typingControllerProps}
					/>
				</div>
				<div className="scroll">
					<GridPaginate
						page={page}
						setPage={setPage}
						totalPages={totalPages}
						loading={loading}
						style={{minHeight: 'calc(85vh - 12rem)'}}
						noResults={tvshows.length === 0 && search != ''}
					>
						{tvshows.map(item => (
							<MediaCard
								media={item}
								showOverview
								key={item.id}
								link={`/user/tvshows/${item.id}/add?status=${statusKey}`}
								onClick={() => setIsOpen(false)}
							/>
						))}
					</GridPaginate>
				</div>
			</Container>
		</ModalContainer>
	)
}

export default SelectTvshow
