interface TvshowDetails
{
	id: number
  image: string
  title: string
  startDate: string
  endDate: string
  status: string
  inProduction: boolean
  rating: number
  seasonsNumber: number
  episodesNumber: number
  overview: string
  genres: Array<
	{
		id: number
		name: string
	}>
	credits:
	{
		cast: Array<
		{
			id: number
			name: string
			image: string
			character: string
		}>
		crew: Array<
		{
			id: number
			name: string
			image: string
			department: string
		}>
	}
}

export const defaultTvshow: TvshowDetails =
{
	id: 0,
	image: '',
	title: '',
	startDate: '',
	endDate: '',
	status: '',
	inProduction: false,
	rating: 0,
	seasonsNumber: 0,
	episodesNumber: 0,
	overview: '',
	genres: [],
	credits:
	{
		cast: [],
		crew: []
	}
}

export default TvshowDetails