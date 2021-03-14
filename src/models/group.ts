import {EventListed} from './event'

export interface GroupRawPrediction
{
	category: string
	guess: number
}

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
		predictions: GroupRawPrediction[]
	}>
}

export const defaultGroupRaw: GroupRaw =
{
	_id: '',
	nickname: '',
	urlId: '',
	banner: '',
	event: '',
	description: '',
	participants: []
}

export interface GroupListed
{
	nickname: string
	urlId: string
	banner: string
	event: EventListed
	description: string
}

export interface GroupEvent
{
	id: string
	name: string
	color: string
	description: string
	categories: Array<
	{
		id: string
		name: string
		description: string
		type: string
		media: Array<
		{
			id: number
			image: string
			title: string
			overview: string
			date: string
			type: string
			participants: Array<
			{
				email: string
				image: string
				name: string
			}>
		}>
		celebrities: Array<
		{
			celebrity:
			{
				id: number
				image: string
				name: string
			}
			media:
			{
				id: number
				image: string
				title: string
				overview: string
				date: string
				type: string
			}
			participants: Array<
			{
				email: string
				image: string
				name: string
			}>
		}>
	}>
}

export interface GroupParticipant
{
	image: string
	name: string
	email: string
	isOwner: boolean
	predictions: Array<
	{
		category:
		{
			id: string
			name: string
			description: string
			type: string
		}
		guess:
		{
			id: number
			image: string
			title: string
			overview: string
			date: string
			type: string
		}
	}>
}

interface Group
{
	urlId: string
	banner: string
	nickname: string
	description: string
	participants: GroupParticipant[]
	event: GroupEvent
}

export default Group