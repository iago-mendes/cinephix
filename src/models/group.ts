import {EventListed} from './event'

export interface GroupRaw
{
	_id: string
	nickname: string
	urlId: string
	banner: string
	event: string
	description: string
	participants: Array<
	{
		email: string
		isOwner: boolean
		predictions: Array<
		{
			category: string
			guess: number
		}>
	}>
}

export interface GroupListed
{
	nickname: string
	urlId: string
	banner: string
	event: EventListed
	description: string
}