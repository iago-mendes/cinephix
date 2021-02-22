import api from './api'

async function dataFetcher(url: string, defaultReturn?: any)
{
	if (url.includes('undefined'))
		return defaultReturn || []

	const {data} = await api.get(url)
	return data
}

export default dataFetcher