import {useEffect, useState} from 'react'

interface User {
	email: string
	image?: string
	name?: string
}

function useUser() {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState<User | undefined>(undefined)

	function signIn() {}

	function signOut() {}

	return {user, loading, signIn, signOut}
}

export default useUser
