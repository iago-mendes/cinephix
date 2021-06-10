interface MovieDetails
{
	id: number
  image: string
  title: string
  date: string
  status: string
  rating: number
  overview: string
	collection?:
	{
    id: number
    name: string
    image: string
  }
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

export const defaultMovieDetails: MovieDetails =
{
	id: 0,
	image: '',
	title: '',
	date: '',
	status: '',
	rating: 0,
	overview: '',
	genres: [],
	credits:
	{
		cast: [],
		crew: []
	}
}

export const loadingMovie: MovieDetails =
{
	id: 0,
	image: '',
	title: '_loading',
	date: '',
	status: '',
	rating: 0,
	overview: '',
	genres: [],
	credits:
	{
		cast: [],
		crew: []
	}
}

export default MovieDetails