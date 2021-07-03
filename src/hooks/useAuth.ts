import {useContext} from 'react'

import {AuthContext} from '../contexts/Auth'

export function useAuth() {
	const auth = useContext(AuthContext)

	return auth
}
