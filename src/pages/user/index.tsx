import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {HiOutlineUserRemove} from 'react-icons/hi'
import {FiArrowRight} from 'react-icons/fi'

import Container from '../../styles/pages/user/index'
import Loading from '../../components/Loading'
import useUser from '../../hooks/useUser'
import UserInfo, {defaultUser} from '../../models/user'
import api from '../../services/api'
import errorAlert from '../../utils/alerts/error'
import Link from 'next/link'

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

	function formatDate(unformatedDate: string)
	{
		const months =
		[
			'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
		]

		const [year, month, day] = unformatedDate.split('T')[0].split('-').map(s => Number(s))
		return `${months[month]} ${day}, ${year}`
	}

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
				<div className='group'>
					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<p>Member since <strong>{formatDate(userInfo.joinedAt)}</strong></p>
				</div>
				<button className='delete'>
					<HiOutlineUserRemove size={25} />
					<span>Delete account</span>
				</button>
			</main>

			<div className="links">
				<Link href='/user/tvshows'>
					<a>
						<span>
							My TV shows ({userInfo.tvshows.length})
							<FiArrowRight size={40} />
						</span>
					</a>
				</Link>
				<Link href='/user/movies'>
					<a>
						<span>
							My movies ({userInfo.movies.length})
							<FiArrowRight size={40} />
						</span>
					</a>
				</Link>
			</div>
		</Container>
	)
}

export default User