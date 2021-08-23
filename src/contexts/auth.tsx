import {ReactNode, useEffect, useState} from 'react'
import {createContext} from 'react'
import {} from 'firebase/auth'

import {auth, firebase} from '../services/firebase'

type User = {
	email: string
	image?: string
	name?: string
}

type AuthContextType = {
	user: User | undefined
	loading: boolean
	signIn: () => Promise<void>
	signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
	children: ReactNode
}

export function AuthProvider({children}: AuthContextProviderProps) {
	const [user, setUser] = useState<User>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				const {email, photoURL: image, displayName: name} = user

				if (!email) throw new Error('Missing information from Google Account!')

				setUser({email, image, name})
			}
			setLoading(false)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	async function signIn() {
		const provider = new firebase.auth.GoogleAuthProvider()

		const result = await auth.signInWithPopup(provider)

		if (result.user) {
			const {email, photoURL: image, displayName: name} = result.user

			if (!email) throw new Error('Missing information from Google Account!')

			setUser({email, image, name})
		}
	}

	async function signOut() {
		await auth.signOut()
		setUser(undefined)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				signIn,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
