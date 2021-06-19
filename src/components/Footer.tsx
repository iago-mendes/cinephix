import Link from 'next/link'
import Container from '../styles/components/Footer'

import logoName from '../assets/logo/name.svg'
import logoIcon from '../assets/logo/icon.svg'
import useDimensions from '../hooks/useDimensions'

const Footer: React.FC = () =>
{
	const {inMobile} = useDimensions()

	return (
		<Container>
			{
				inMobile
					? (
						<Attribution />
					)
					: (
						<>
							<Link href='/' >
								<div className='logos'>
									<img src={logoIcon} className='icon' />
									<img src={logoName} className='name' />
								</div>
							</Link>

							<div className='info'>
								<div className='links'>
									<Link href='/' >Home</Link>
									<Link href='/movies' >Movies</Link>
									<Link href='/tvshows' >TV shows</Link>
									<Link href='/celebrities' >Celebrities</Link>
									<Link href='/about' >About</Link>
									<Link href='/about/privacy-policy' >Privacy Policy</Link>
								</div>
								<Attribution />
							</div>
						</>
					)
			}
		</Container>
	)
}

const Attribution: React.FC = () => (
	<div className='attribution'>
		<Link href='/about/media-data'>Media data</Link> from <a target='_blank' rel='noreferrer' href='https://www.themoviedb.org/'>TMDb</a>.
	</div>
)

export default Footer