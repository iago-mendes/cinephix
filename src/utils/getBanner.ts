import banners from '../../db/banners.json'
import {apiUrl} from '../services/api'

function getBanner(path: string)
{
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