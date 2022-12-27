import {useEffect, useState} from 'react'
import {HiOutlineUserRemove} from 'react-icons/hi'
import {FiArrowRight} from 'react-icons/fi'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Trans, t} from '@lingui/macro'
import {useRouter} from 'next/router'

import Container from '../../styles/pages/user/index'
import Loading from '../../components/Loading'
import {useAuth} from '../../hooks/useAuth'
import UserInfo, {defaultUser} from '../../models/user'
import api from '../../services/api'
import errorAlert from '../../utils/alerts/error'
import successAlert from '../../utils/alerts/success'
import SEOHead from '../../components/SEOHead'
import {formatDate} from '../../utils/formatDate'

const MySwal = withReactContent(Swal)

const User: React.FC = () => {
	const {user, signOut} = useAuth()
	const {locale} = useRouter()

	const [userInfo, setUserInfo] = useState<UserInfo>(defaultUser)
	const [groupsNumber, setGroupsNumber] = useState(0)

	useEffect(() => {
		if (user) {
			api
				.get(`users/${user.email}`)
				.then(({data}: {data: UserInfo}) => {
					setUserInfo(data)
				})
				.catch(err => {
					errorAlert(err.response.data.message)
				})

			api
				.get(`groups/participants/${user.email}`)
				.then(({data}: {data: any[]}) => {
					setGroupsNumber(data.length)
				})
		}
	}, [user])

	function handleDelete() {
		MySwal.fire({
			icon: 'question',
			title: t`Are you sure?`,
			text: t`If you continue, your account and all your information (TV shows and movies) will be deleted!`,
			showCancelButton: true,
			confirmButtonText: t`Continue`,
			cancelButtonText: t`Cancel`
		}).then(res => {
			if (res.isConfirmed) {
				api
					.delete(`users/${userInfo.email}`)
					.then(() => {
						successAlert(t`Your account was successfully deleted!`)
						signOut()
					})
					.catch(err => {
						errorAlert(err.response.data.message)
					})
			}
		})
	}

	if (!user) return <Loading style={{marginTop: 'calc(50vh - 5rem)'}} />

	return (
		<Container className="page">
			<SEOHead title="My profile | Cinephix" />

			<main>
				<img src={user.image} alt={user.name} />
				<div className="group">
					<h1>{user.name}</h1>
					<h2>{user.email}</h2>
					<p>
						<Trans>Member since</Trans>{' '}
						<strong>{formatDate(userInfo.joinedAt, locale)}</strong>
					</p>
				</div>
				<button className="delete" onClick={handleDelete}>
					<HiOutlineUserRemove size={25} />
					<span>
						<Trans>Delete account</Trans>
					</span>
				</button>
			</main>

			<div className="links">
				{/* <Link href="/groups">
					<span>
						<Trans>My groups</Trans> ({groupsNumber})
						<FiArrowRight size={40} />
					</span>
				</Link> */}
				<Link href="/user/tvshows">
					<span>
						<Trans>My TV shows</Trans> ({userInfo.tvshows.length})
						<FiArrowRight size={40} />
					</span>
				</Link>
				<Link href="/user/movies">
					<span>
						<Trans>My movies</Trans> ({userInfo.movies.length})
						<FiArrowRight size={40} />
					</span>
				</Link>
			</div>
		</Container>
	)
}

export default User
