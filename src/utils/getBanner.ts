import banners from '../../db/banners.json'

function getBanner(path: string)
{
	const apiUrl = process.env.NEXT_PUBLIC_API_URL
	return apiUrl + path
}

export function chooseRandomBanner()
{
	const min = 0
	const max = banners.length

	const index = Math.floor(Math.random() * (max - min) ) + min
	const path = banners[index].path

	return path
}

export default getBanner