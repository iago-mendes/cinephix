import Link from 'next/link'
import Container from '../styles/components/Footer'
import {Trans} from '@lingui/macro'

import logoName from '../assets/images/logo/name.svg'
import logoIcon from '../assets/images/logo/icon.svg'
import useDimensions from '../hooks/useDimensions'

const Footer: React.FC = () => {
	const {inMobile} = useDimensions()

	return (
		<Container>
			{inMobile ? (
				<Attribution />
			) : (
				<>
					<Link href="/">
						<div className="logos">
							<img src={logoIcon} className="icon" />
							<img src={logoName} className="name" />
						</div>
					</Link>

					<div className="info">
						<div className="links">
							<Trans>
								<Link href="/">Home</Link>
							</Trans>
							<Trans>
								<Link href="/movies">Movies</Link>
							</Trans>
							<Trans>
								<Link href="/tvshows">TV shows</Link>
							</Trans>
							<Trans>
								<Link href="/celebrities">Celebrities</Link>
							</Trans>
							<Trans>
								<Link href="/about">About</Link>
							</Trans>
							<Trans>
								<Link href="/about/privacy-policy">Privacy Policy</Link>
							</Trans>
						</div>
						<Attribution />
					</div>
				</>
			)}
		</Container>
	)
}

const Attribution: React.FC = () => (
	<div className="attribution">
		<Trans>
			<Link href="/about/media-data">Media data</Link> from{' '}
			<a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
				TMDb
			</a>
			.
		</Trans>
	</div>
)

export default Footer
