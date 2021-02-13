import {useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'
import useSWR from 'swr'

import Container from '../../styles/components/modals/Select'
import {modalStyle} from '../../styles/global'
import MediaCard, {Media} from '../cards/Media'
import GridPaginate from '../../components/GridPaginate'
import { useRouter } from 'next/router'

Modal.setAppElement('#__next')

interface SelectTvshowProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	statusKey: string
}

const SelectTvshow: React.FC<SelectTvshowProps> = ({isOpen, setIsOpen, statusKey}) =>
{
	const router = useRouter()

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

	function handleNavigateToAddTvshow(id: number)
	{
		router.push(`/user/tvshows/${id}/add?status=${statusKey}`)
		setIsOpen(false)
	}

	return (
		<Modal
			isOpen={isOpen}
			style={modalStyle}
		>
			<Container>
				<header>
					<h1>Select a TV show</h1>
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
						autoFocus
						maxLength={100}
					/>
				</div>
				<div className='scroll'>
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
								type='tvshow'
								navigateOnClick={false}
								onClick={handleNavigateToAddTvshow}
							/>
						))}
					</GridPaginate>
				</div>
			</Container>
		</Modal>
	)
}

export default SelectTvshow