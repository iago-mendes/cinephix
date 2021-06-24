import {NextApiHandler} from 'next'
import NextAuth, {InitOptions} from 'next-auth'
import Providers from 'next-auth/providers'

import api from '../../../services/api'

const config: InitOptions =
{
	secret: process.env.AUTH_SECRET,
	providers:
	[
		Providers.Google(
			{
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET
			})
	],
	jwt:
	{
		secret: process.env.AUTH_SECRET
	},
	events:
	{
		signIn: async (message) =>
		{
			if (message && message.user && message.user.email)
			{
				const data =
				{
					image: message.user.image,
					name: message.user.name
				}
				
				api.post(`users/${message.user.email}`, data)
					.catch(error => console.log('[error]', error))
			}
		}
	}
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, config)
export default authHandler