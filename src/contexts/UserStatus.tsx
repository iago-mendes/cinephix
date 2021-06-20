import {createContext, ReactNode, useContext, useState} from 'react'

type UserStatusContextData =
{
	isTyping: boolean
	toggleTypingStatus: () => void
	typingControllerProps: any
}

const UserStatusContext = createContext({} as UserStatusContextData)

export const UserStatusProvider: React.FC = ({children}:{children: ReactNode}) =>
{
	const [isTyping, setIsTyping] = useState(false)
	const typingControllerProps =
	{
		onFocus: toggleTypingStatus,
		onBlur: toggleTypingStatus
	}

	function toggleTypingStatus()
	{
		setIsTyping(!isTyping)
	}

	return (
		<UserStatusContext.Provider
			value=
				{{
					isTyping,
					toggleTypingStatus,
					typingControllerProps
				}}
		>
			{children}
		</UserStatusContext.Provider>
	)
}

export const useUserStatus = () =>
{
	return useContext(UserStatusContext)
}