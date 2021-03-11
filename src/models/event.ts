interface Event
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
		media: EventMedia[]
		celebrities: EventCelebrity[]
	}>
}

export interface EventMedia
{
	id: number
	image: string
	title: string
	overview: string
	date: string
	type: string
}

export interface EventCelebrity
{
	celebrity:
	{
		id: number
		image: string
		name: string
	}
	media: EventMedia
}

export interface EventListed
{
	id: string
	name: string
	color: string
	description: string
}

export default Event