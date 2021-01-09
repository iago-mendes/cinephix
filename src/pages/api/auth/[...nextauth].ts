import {NextApiHandler} from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import getConfig from 'next/config'

const {serverRuntimeConfig: env} = getConfig()

const config =
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
	}
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, config)
export default authHandler