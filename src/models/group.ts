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