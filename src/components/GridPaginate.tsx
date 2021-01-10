import {BsChevronBarLeft, BsChevronLeft, BsChevronRight, BsChevronBarRight} from 'react-icons/bs'

import Container from '../styles/components/GridPaginate'

interface GridPaginateProps
{
	page: number
	setPage: Function

	totalPages: number
}

const GridPaginate: React.FC<GridPaginateProps> = ({page, setPage, totalPages, children}) =>
{
	function goBack()
	{
		if (page > 1)
			setPage(page - 1)
	}

	function goNext()
	{
		if (page < totalPages)
			setPage(page + 1)
	}

	return (
		<Container>
			<main>
				{children}
			</main>
			<div className="paginate">
				<div className="buttons">
					<button onClick={() => setPage(1)}>
						<BsChevronBarLeft size={30} />
					</button>
					<button onClick={goBack}>
						<BsChevronLeft size={30} />
					</button>
				</div>
				<div className="controller">
					<input
						type='number'
						value={page}
						onChange={e => setPage(e.target.value)}
						min={1}
						max={totalPages}
					/>
					<span> / {totalPages}</span>
				</div>
				<div className="buttons">
					<button onClick={goNext}>
						<BsChevronRight size={30} />
					</button>
					<button>
						<BsChevronBarRight size={30} onClick={() => setPage(totalPages)}/>
					</button>
				</div>
			</div>
		</Container>
	)
}

export default GridPaginate