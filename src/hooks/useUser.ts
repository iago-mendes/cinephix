import {useContext} from 'react'

import {AuthContext} from '../contexts/Auth'

function useUser() {
	const auth = useContext(AuthContext)

	return auth
}

export default useUser
