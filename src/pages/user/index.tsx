import Head from 'next/head'
import Image from 'next/image'

import Container from '../../styles/pages/user/index'
import Loading from '../../components/Loading'
import useUser from '../../hooks/useUser'
import {BiUserCircle} from 'react-icons/bi'

const User: React.FC = () =>
{
	const {user} = useUser()

	return (
		<Container className='page' >
			<Head>
				<title>User</title>
			</Head>

			<main>
				<div className='imgContainer'>
					{
						user.image
						? <img src={user.image} alt={user.name} className='img' />
						: <BiUserCircle size={35} className='img' />
					}
				</div>
			</main>
		</Container>
	)
}

export default User