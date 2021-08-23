import {useContext} from 'react'

import {UserStatusContext} from '../contexts/userStatus'

export function useUserStatus() {
	return useContext(UserStatusContext)
}
