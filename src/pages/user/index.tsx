import {useEffect, useState} from 'react'
import {HiOutlineUserRemove} from 'react-icons/hi'
import {FiArrowRight} from 'react-icons/fi'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {signOut} from 'next-auth/client'

import Container from '../../styles/pages/user/index'
import Loading from '../../components/Loading'
import useUser from '../../hooks/useUser'
import UserInfo, {defaultUser} from '../../models/user'
import api from '../../services/api'
import errorAlert from '../../utils/alerts/error'
import successAlert from '../../utils/alerts/success'
import SEOHead from '../../components/SEOHead'

const MySwal = withReactContent(Swal)

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
		return `${months[month-1]} ${day}, ${year}`
	}

	function handleDelete()
	{
		MySwal.fire(
			{
				icon: 'question',
				title: 'Are you sure?',
				text: 'If you continue, your account and all your information (TV shows and movies) will be deleted!',
				showCancelButton: true,
				confirmButtonText: 'Continue'
			})
			.then(res =>
			{
				if (res.isConfirmed)
				{
					api.delete(`users/${userInfo.email}`)
						.then(() =>
						{
							successAlert('Your account was successfully deleted!')
							signOut()
						})
						.catch(err =>
						{
							errorAlert(err.response.data.message)
						})
				}
			})
	}

	if (!user)
		return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<Container className='page' >
			<SEOHead
				title='My profile | Cinephix'
			/>

			<main>
				<img src={user.image} alt={user.name} />
				<div className='group'>
					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<p>Member since <strong>{formatDate(userInfo.joinedAt)}</strong></p>
				</div>
				<button className='delete' onClick={handleDelete} >
					<HiOutlineUserRemove size={25} />
					<span>Delete account</span>
				</button>
			</main>

			<div className='links'>
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