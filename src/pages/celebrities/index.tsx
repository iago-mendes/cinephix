import {GetStaticProps} from 'next'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import useSWR from 'swr'

import api from '../../services/api'
import CelebrityCard, {Celebrity} from '../../components/CelebrityCard'
import GridPaginate from '../../components/GridPaginate'
import SearchBox from '../../components/SearchBox'
import actors from '../../assets/backgrounds/actors.png'
import HeaderWithBackground from '../../components/HeaderWithBackground'

interface CelebritiesProps
{
	staticCelebrities: Celebrity[]
}

const Celebrities: React.FC<CelebritiesProps> = ({staticCelebrities}) =>
{
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	
	const [celebrities, setCelebrities] = useState<Celebrity[]>(staticCelebrities)
	const {data, error, revalidate} = useSWR(`/api/getCelebrities?search=${search}&page=${page}`)

	useEffect(() =>
	{
		if (data)
		{
			setCelebrities(data.celebrities)
			setPage(data.paginate.page)
			setTotalPages(data.paginate.total)
		}
		else if (error)
		{
			setCelebrities(staticCelebrities)
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
			setCelebrities(staticCelebrities)
		}
		else
		{
			revalidate()
			setLoading(true)
		}
	}, [search, page])

	useEffect(() =>
	{
		if (celebrities)
			setLoading(false)
	}, [celebrities])

	useEffect(() =>
	{
		setPage(1)
		if (search !== '')
			setTotalPages(1)
	}, [search])

	return (
		<div>
			<Head>
				<title>Celebrities</title>
			</Head>

			<HeaderWithBackground background={actors} display='Celebrities' >
				<SearchBox search={search} setSearch={setSearch} display='Search for a celebrity' />
			</HeaderWithBackground>

			{
				celebrities.length === 0
					? (
						<div className='noResults'>
							<h1>No results were found!</h1>
						</div>
					)
					: (
						<GridPaginate page={page} setPage={setPage} totalPages={totalPages} loading={loading} >
							{celebrities.map(celebrity => (
								<CelebrityCard celebrity={celebrity} showKnownFor key={celebrity.id} />
							))}
						</GridPaginate>
					)
			}
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () =>
{
	const {data}:{data: Celebrity[]} = await api.get('/celebrities')

	return {
		props: {staticCelebrities: data},
		revalidate: 5
	}
}

export default Celebrities