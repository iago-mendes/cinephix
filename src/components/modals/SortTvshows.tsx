import {useState} from 'react'
import {BiSort} from 'react-icons/bi'
import {motion} from 'framer-motion'
import {FiX} from 'react-icons/fi'

import Container from '../../styles/components/modals/SortTvshows'
import useClickOutside from '../../hooks/useClickOutside'
import {UserTvshowListed as UserTvshow} from '../../models/userTvshow'
import {TvshowList} from '../../pages/user/tvshows/index'
import getTotalRating from '../../utils/getTotalRating'
import api from '../../services/api'
import useUser from '../../hooks/useUser'

interface SortTvshowsModalProps
{
	statusKey: string
	statusTvshows: UserTvshow[]

	tvshowList: TvshowList
	setTvshowList: (p: TvshowList) => void
}

const SortTvshowsModal: React.FC<SortTvshowsModalProps> = ({statusKey, statusTvshows, tvshowList, setTvshowList}) =>
{
	const {user} = useUser()

	const [showOptions, setShowOptions] = useState(false)
	const ref = useClickOutside(() => setShowOptions(false))

	async function handleSort(option: string)
	{
		setShowOptions(false)

		let tvshows = statusTvshows

		if (option === 'title')
			tvshows.sort((a, b) => a.title < b.title ? -1 : 1)
		if (option === 'rating')
			tvshows.sort((a, b) => getTotalRating(a.ratings) > getTotalRating(b.ratings) ? -1 : 1)
		if (option === 'rating-')
			tvshows.sort((a, b) => getTotalRating(a.ratings) < getTotalRating(b.ratings) ? -1 : 1)

		const data =
		{
			tvshows: tvshows.map(tvshow => tvshow.id)
		}

		await api.put(`users/${user.email}/tvshows/status/${statusKey}`, data)

		let tmpTvshowList = tvshowList
		tmpTvshowList[statusKey] = tvshows
		setTvshowList(tmpTvshowList)
	}

	return (
		<Container ref={ref} >
			<button
				title='Sort TV shows'
				onClick={() => setShowOptions(true)}
			>
				<BiSort size={20} />
			</button>

			<motion.div
				initial={false}
				transition={{duration: 0.25}}
				animate={showOptions ? 'open' : 'closed'}
				variants=
					{{
						open:
						{
							height: 'fit-content',
							width: 'fit-content',
							opacity: 1,
						},
						closed:
						{
							height: 0,
							width: 0,
							opacity: 0,
						}
					}}
				style=
					{{
						position: 'absolute',
						right: 0,
						top: '3rem',
						zIndex: 100,

						overflow: 'hidden',
						direction: 'rtl',
					}}
			>
				<div className='options' >
					<header>
						<div className='group'>
							<h3>Sort by...</h3>
							<button className='close' onClick={() => setShowOptions(false)} >
								<FiX size={20} />
							</button>
						</div>
					</header>
					<ul>
						<li onClick={() => handleSort('title')} >
							Title (alphabetically)
						</li>
						{/* <li onClick={() => handleSort('date')} >
							Release date (newest first)
						</li>
						<li onClick={() => handleSort('date-')} >
							Release date (oldest first)
						</li> */}
						<li onClick={() => handleSort('rating')} >
							My rating (highest first)
						</li>
						<li onClick={() => handleSort('rating-')} >
							My rating (lowest first)
						</li>
					</ul>
				</div>
			</motion.div>
		</Container>
	)
}

export default SortTvshowsModal