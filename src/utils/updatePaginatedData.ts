import api from '../services/api'

type UpdatePaginatedDataProps =
{
	route: string

	setData: (data: any) => void
	setLoading: (loading: boolean) => void

	search: string
	page: number

	setPage: (page: number) => void
	setTotalPages: (totalPages: number) => void

	defaultData?: any
}

export async function updatePaginatedData
({
	route,
	setData,
	setLoading,
	search,
	page,
	setPage,
	setTotalPages,
	defaultData = []
}:UpdatePaginatedDataProps)
{
	if (!(search === '' && page === 1))
		setLoading(true)

	await api.get(route, {params: {search, page}})
		.then(({data, headers}) =>
		{
			setData(data)

			const tmpPage = Number(headers.page)
			if (Number.isNaN(tmpPage))
				setPage(1)
			else
				setPage(tmpPage)
				
			const tmpTotalPages = Number(headers.totalpages)
			if (Number.isNaN(tmpTotalPages))
				setTotalPages(1)
			else
				setTotalPages(tmpTotalPages)
		})
		.catch(error =>
		{
			setData(defaultData)
			console.log('<< error >>', error)

			setPage(1)
			setTotalPages(1)
		})

	setLoading(false)
}