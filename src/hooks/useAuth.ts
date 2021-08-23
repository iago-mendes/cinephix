import {useContext} from 'react'

import {AuthContext} from '../contexts/auth'

export function useAuth() {
	const auth = useContext(AuthContext)

	return auth
}
