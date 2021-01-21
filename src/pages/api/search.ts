import {NextApiHandler} from 'next'

import api from '../../services/api'

const search: NextApiHandler = async (req, res) =>
{
	const {category, search} = req.query

	const {data} = await api.get(String(category), {params: {search}})

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify(data))
}

export default search