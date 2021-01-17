import {signIn} from 'next-auth/client'

const NotSigned: React.FC = () =>
{
	return (
		<div>
			<h1>You must be signed in to access this page.</h1>
			<button onClick={() => signIn('google')} >Sign in</button>
		</div>
	)
}

export default NotSigned