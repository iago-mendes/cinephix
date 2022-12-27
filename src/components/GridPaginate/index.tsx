import {ChangeEvent, PropsWithChildren} from 'react'
import {
	BsChevronBarLeft,
	BsChevronLeft,
	BsChevronRight,
	BsChevronBarRight
} from 'react-icons/bs'
import {CSSProperties} from 'styled-components'
import {t} from '@lingui/macro'

import Container from './styles'
import Loading from '../Loading'

interface GridPaginateProps {
	page: number
	setPage: (p: number) => void

	totalPages: number

	loading: boolean
	noResults: boolean

	style?: CSSProperties

	hidePaginate?: boolean
	noResultsMessage?: string
}

const GridPaginate = ({
	page,
	setPage,
	totalPages,
	loading,
	style = {},
	noResults,
	children,
	hidePaginate = false,
	noResultsMessage = t`No results found!`
}: PropsWithChildren<GridPaginateProps>) => {
	function goBack() {
		if (page > 1) setPage(page - 1)
	}

	function goNext() {
		if (page < totalPages) setPage(page + 1)
	}

	function handlePageChange(e: ChangeEvent<HTMLInputElement>) {
		const tmpPage = Number(e.target.value)

		if (tmpPage >= 1 && tmpPage <= totalPages) setPage(tmpPage)
	}

	return (
		<Container style={style}>
			{loading ? (
				<Loading style={{marginTop: '10rem'}} />
			) : noResults ? (
				<div className="noResults">
					<h1>{noResultsMessage}</h1>
				</div>
			) : (
				<main>{children}</main>
			)}

			{!hidePaginate && (
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
							type="number"
							value={page}
							onChange={handlePageChange}
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
							<BsChevronBarRight
								size={30}
								onClick={() => setPage(totalPages)}
							/>
						</button>
					</div>
				</div>
			)}
		</Container>
	)
}

export default GridPaginate
