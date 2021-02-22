import api from './api'

async function dataFetcher(url: string)
{
	const {data} = await api.get(url)
	return data
}

export default dataFetcher