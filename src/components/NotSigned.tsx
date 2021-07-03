import {useAuth} from '../hooks/useAuth'

const NotSigned: React.FC = () => {
	const {signIn} = useAuth()

	return (
		<div>
			<h1>You must be signed in to access this page.</h1>
			<button onClick={signIn}>Sign in</button>
		</div>
	)
}

export default NotSigned
