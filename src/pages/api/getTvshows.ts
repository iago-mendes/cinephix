import {NextApiHandler} from "next"

import api from "../../services/api"

const getTvshows: NextApiHandler = async (req, res) =>
{
	const {search, page} = req.query

	const {data, headers} = await api.get('tvshows', {params: {search, page}})
	const paginate =
	{
		page: Number(headers.page),
		total: Number(headers.totalpages)
	}

	res.statusCode = 200
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({tvshows: data, paginate}))
}

export default getTvshows