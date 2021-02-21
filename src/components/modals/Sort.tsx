import {useState} from 'react'
import {BiSort} from 'react-icons/bi'
import {motion} from 'framer-motion'
import {FiX} from 'react-icons/fi'

import Container from '../../styles/components/modals/Sort'
import useClickOutside from '../../hooks/useClickOutside'

const SortModal: React.FC = () =>
{
	const [showOptions, setShowOptions] = useState(false)
	const ref = useClickOutside(() => setShowOptions(false))

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
						<li>Title (alphabetically)</li>
						<li>Release date (newest first)</li>
						<li>Release date (oldest first)</li>
						<li>My rating (highest first)</li>
						<li>My rating (lowest first)</li>
					</ul>
				</div>
			</motion.div>
		</Container>
	)
}

export default SortModal