import {NextApiHandler} from "next"

import api from "../../services/api"

const getMovies: NextApiHandler = async (req, res) =>
{
	const {search} = req.query

	const {data} = (search && search !== '')
		? await api.get(`movies?search=${search}`)
		: await api.get('movies')

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({movies: data}))
}

export default getMovies