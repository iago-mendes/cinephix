import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from 'react'

import Container from '../../styles/pages/user/index'
import Loading from '../../components/Loading'
import useUser from '../../hooks/useUser'
import UserInfo, {defaultUser} from '../../models/user'
import api from '../../services/api'
import errorAlert from '../../utils/alerts/error'

const User: React.FC = () =>
{
	const {user} = useUser()

	const [userInfo, setUserInfo] = useState<UserInfo>(defaultUser)

	useEffect(() =>
	{
		if (user)
			api.get(`users/${user.email}`)
				.then(({data}:{data: UserInfo}) =>
				{
					setUserInfo(data)
				})
				.catch(err =>
				{
					errorAlert(err.response.data.message)
				})
	}, [user])

	if (!user)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<Container className='page' >
			<Head>
				<title>User</title>
			</Head>

			<main>
				<div className='img'>
					<Image src={user.image} width={100} height={100} layout='responsive'/>
				</div>
				<div className="group">
					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<p>Member since </p>
				</div>
			</main>
		</Container>
	)
}

export default User