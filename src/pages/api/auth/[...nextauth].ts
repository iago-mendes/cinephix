import {NextApiHandler} from 'next'
import NextAuth, {InitOptions} from 'next-auth'
import Providers from 'next-auth/providers'
import getConfig from 'next/config'

import api from '../../../services/api'

const {serverRuntimeConfig: env} = getConfig()

const config: InitOptions =
{
	secret: env.authSecret,
	providers:
	[
		Providers.Google(
			{
				clientId: env.googleClientId,
				clientSecret: env.googleClientSecret
			})
	],
	jwt:
	{
		secret: env.authSecret
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