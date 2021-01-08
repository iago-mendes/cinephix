import {NextApiHandler} from "next"

import api from "../../services/api"

const getHome: NextApiHandler = async (req, res) =>
{
	const {search} = req.query

	const {data} = (search && search !== '')
		? await api.get(`home?search=${search}`)
		: await api.get('home')

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({home: data}))
}

export default getHome