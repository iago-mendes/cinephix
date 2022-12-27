import {useCallback, useEffect, useState} from 'react'

import api from '../services/api'

type Props = {
	route: string

	setData: (data: any) => void
	setLoading: (loading: boolean) => void

	search: string
	page: number

	setPage: (page: number) => void
	setTotalPages: (totalPages: number) => void

	defaultData?: any
	language?: string
}

export function usePaginatedData({
	route,
	setData,
	setLoading,
	search,
	page,
	setPage,
	setTotalPages,
	defaultData = [],
	language
}: Props) {
	const timeoutInterval = 3
	const [searchTimeout, setSearchTimeout] = useState(timeoutInterval)

	const updateData = useCallback(async () => {
		if (!(search === '' && page === 1)) setLoading(true)
		else setData(defaultData)

		await api
			.get(route, {params: {search, page, language}})
			.then(({data, headers}) => {
				setData(data)

				const tmpPage = Number(headers.page)
				if (Number.isNaN(tmpPage)) setPage(1)
				else setPage(tmpPage)

				const tmpTotalPages = Number(headers.totalpages)
				if (Number.isNaN(tmpTotalPages)) setTotalPages(1)
				else setTotalPages(tmpTotalPages)
			})
			.catch(error => {
				setData(defaultData)
				console.log('<< error >>', error)

				setPage(1)
				setTotalPages(1)
			})

		setLoading(false)
	}, [
		defaultData,
		language,
		page,
		route,
		search,
		setData,
		setLoading,
		setPage,
		setTotalPages
	])

	// timer
	useEffect(() => {
		const interval = setInterval(() => {
			setSearchTimeout(prev => (prev < 0 ? prev : prev - 1))
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	// page change
	useEffect(() => {
		updateData()
	}, [page, updateData])

	// search change
	useEffect(() => {
		if (search === '') updateData()
		else setLoading(true)

		setSearchTimeout(timeoutInterval)
	}, [search, setLoading, updateData])

	// timer end
	useEffect(() => {
		if (searchTimeout === 0 && search !== '') updateData()
	}, [search, searchTimeout, updateData])
}
