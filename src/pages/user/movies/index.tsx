import Head from 'next/head'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {BsFillTriangleFill} from 'react-icons/bs'

import Container from '../../../styles/pages/user/movies/index'
import api from '../../../services/api'
import useUser from '../../../hooks/useUser'
import getTotalRating from '../../../utils/getTotalRating'
import {UserMovieListed} from '../../../models/userMovie'

const UserMovies: React.FC = () =>
{
	const {user} = useUser()

	const [movieList, setMovieList] = useState<UserMovieListed[]>([])

	useEffect(() =>
	{
		async function getMovieList()
		{
			if (user)
			{
				const {data}:{data: UserMovieListed[]} = await api.get(`users/${user.email}/movies`)
				setMovieList(data)
			}
		}

		getMovieList()
	}, [user])

	return (
		<Container>
			<Head>
				<title>User movies</title>
			</Head>

			<main>
				<div className='watchList'>
					<div className='dropdown'>
						<BsFillTriangleFill size={30}/>
						<span>Watch list</span>
					</div>
					<div className='grid' >
						{movieList.filter(({watched}) => !watched).map((movie, index) => (
							<div
								className='movie'
								onClick={() => {}}
							>
								<div className='img'>
									<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
								</div>
								<div className='info'>
									<h2>{movie.data.title}</h2>
									<div className='details'>
										<span className='venue'>{movie.venue}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='watched'>
					<div className='grid' >
						{movieList.filter(({watched}) => watched).map((movie) => (
							<div
								key={movie.data.id}
								className='movie'
								onClick={() => {}}
							>
								<div className='img'>
									<Image src={movie.data.image} width={780} height={1170} layout='responsive'/>
								</div>
								<div className='info'>
									<h2>{movie.data.title}</h2>
									<div className='details'>
										{
											Object.values(movie.ratings).length !== 0 && (
												<span className='ratings'>
													{getTotalRating(movie.ratings, true, 13)} ({getTotalRating(movie.ratings)})
												</span>
											)
										}
										<span className='venue'>{movie.venue}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</Container>
	)
}

export default UserMovies