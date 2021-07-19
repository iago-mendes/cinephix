import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'

import Container from '../../styles/components/modals/Select'

import MediaCard, {Media} from '../cards/Media'
import GridPaginate from '../../components/GridPaginate'
import {updatePaginatedData} from '../../utils/updatePaginatedData'
import ModalContainer from './Container'
import {useUserStatus} from '../../contexts/UserStatus'

interface SelectMovieProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	watched: boolean
}

const SelectMovie: React.FC<SelectMovieProps> = ({
	isOpen,
	setIsOpen,
	watched
}) => {
	const {typingControllerProps} = useUserStatus()

	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)

	const [movies, setMovies] = useState<Media[]>([])

	useEffect(() => {
		updatePaginatedData({
			route: 'movies',
			setData: setMovies,
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
			display="Select a movie"
		>
			<Container>
				<div className="search">
					<FaSearch size={25} />
					<input
						type="text"
						placeholder="Search for a movie"
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
						noResults={movies.length === 0 && search != ''}
					>
						{movies.map(item => (
							<MediaCard
								media={item}
								showOverview
								key={item.id}
								link={`/user/movies/${item.id}/add?watched=${watched}`}
								onClick={() => setIsOpen(false)}
							/>
						))}
					</GridPaginate>
				</div>
			</Container>
		</ModalContainer>
	)
}

export default SelectMovie
