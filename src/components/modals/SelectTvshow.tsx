import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'
import useSWR from 'swr'

import Container from '../../styles/components/modals/SelectTvshow'
import {modalStyle} from '../../styles/global'
import MediaCard, {Media} from '../../components/MediaCard'
import GridPaginate from '../../components/GridPaginate'

Modal.setAppElement('#__next')

interface SelectTvshowProps
{
	isOpen: boolean
	setIsOpen: Function
}

const SelectTvshow: React.FC<SelectTvshowProps> = ({isOpen, setIsOpen}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [tvshows, setTvshows] = useState<Media[]>([])
	const {data, error, revalidate} = useSWR(`/api/getTvshows?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data && search !== '')
		{
			setTvshows(data.tvshows)
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)
		}
		else if (error)
		{
			setTvshows([])
			setPage(1)
			setTotalPages(1)

			console.error(error)
		}
	}, [data, error])

	useEffect(() =>
	{
		if (search === '' && page === 1)
		{
			revalidate()
			setTvshows([])
		}
		else
		{
			revalidate()
			setLoading(true)
		}
	}, [search, page])

	useEffect(() =>
	{
		if (tvshows)
			setLoading(false)
	}, [tvshows])

	useEffect(() =>
	{
		setPage(1)
		if (search !== '')
			setTotalPages(1)
	}, [search])

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<button onClick={() => setIsOpen(false)} >
						<FiX size={25} />
					</button>
				</header>
				<div className='search'>
					<FaSearch size={25} />
					<input
						type='text'
						placeholder='Search for a TV show'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
				<div className='scroll'>
					<GridPaginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} >
						{tvshows.map(item => (
							<MediaCard media={item} showOverview key={item.id} type='tvshow' />
						))}
					</GridPaginate>
				</div>
			</Container>
		</Modal>
	)
}

export default SelectTvshow