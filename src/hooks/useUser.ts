import {useSession} from 'next-auth/client'
import {useEffect, useState} from 'react'
import {
	signIn as nextAuthSignIn,
	signOut as nextAuthSignOut
} from 'next-auth/client'

interface User {
	email: string
	image?: string
	name?: string
}

function useUser() {
	const [session, loading] = useSession()
	const [user, setUser] = useState<User | undefined>(undefined)

	useEffect(() => {
		if (!session) setUser(undefined)
		else if (session.user.email) {
			const tmpUser: User = {
				email: session.user.email,
				image: session.user.image || undefined,
				name: session.user.name || undefined
			}

			setUser(tmpUser)
		}
	}, [session])

	function signIn() {
		const callbackUrl =
			process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/auth/callback/google'
		nextAuthSignIn('google', {callbackUrl})
	}

	function signOut() {
		nextAuthSignOut()
	}

	return {user, loading, signIn, signOut}
}

export default useUser
