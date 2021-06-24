import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'

import Container from '../../styles/components/modals/Select'
import {modalStyle} from '../../styles/global'
import MediaCard, {Media} from '../cards/Media'
import GridPaginate from '../../components/GridPaginate'
import {updatePaginatedData} from '../../utils/updatePaginatedData'

Modal.setAppElement('#__next')

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
		<Modal isOpen={isOpen} style={modalStyle}>
			<Container>
				<header>
					<h1>Select a movie</h1>
					<button onClick={() => setIsOpen(false)}>
						<FiX size={25} />
					</button>
				</header>
				<div className="search">
					<FaSearch size={25} />
					<input
						type="text"
						placeholder="Search for a movie"
						value={search}
						onChange={e => setSearch(e.target.value)}
						autoFocus
						maxLength={100}
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
		</Modal>
	)
}

export default SelectMovie
