import {useSession} from 'next-auth/client'
import {useEffect, useState} from 'react'

interface User
{
	email: string
	image?: string
	name?: string
}

function useUser()
{
	const [session, loading] = useSession()
	const [user, setUser] = useState<User | undefined>(undefined)

	useEffect(() =>
	{
		if (!session)
			setUser(undefined)
		else if (session.user.email)
		{
			const tmpUser: User =
			{
				email: session.user.email,
				image: session.user.image || undefined,
				name: session.user.name || undefined
			}

			setUser(tmpUser)
		}
	}, [session])

	return {user, loading}
}

export default useUser