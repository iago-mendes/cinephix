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

interface Group
{
	urlId: string
	banner: string
	nickname: string
	description: string
	participants: Array<
	{
		image: string
		name: string
		email: string
		isOwner: true
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
				id: 484718
				image: string
				title: string
				overview: string
				date: string
				type: string
			}
		}>
	}>
	event:
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
				id: 484718
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
					id: 1753914
					image: string
					name: string
				}
				media:
				{
					id: 583689
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
}

export default Group