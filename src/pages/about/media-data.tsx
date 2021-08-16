import Image from 'next/image'

import Container from '../../styles/pages/about/global'
import SEOHead from '../../components/SEOHead'
import tmdbLogo from '../../assets/images/tmdb.svg'

const PrivacyPolicy: React.FC = () => {
	return (
		<Container className="page">
			<SEOHead title="Media Data | Cinephix" />

			<main>
				<h1>Media Data</h1>

				<figure style={{width: 300}}>
					<Image src={tmdbLogo} alt="The Movie Database (TMDb)" />
				</figure>

				<p>
					All data used in Cinephix regarding movies, TV shows, and celebrities
					— such as titles, images, cast, crew, overview, dates, etc. — is
					supplied by{' '}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.themoviedb.org/"
					>
						The Movie Database (TMDb)
					</a>
					.
				</p>

				<p>
					<em>
						Cinephix uses the TMDb API but is not endorsed or certified by TMDb.
					</em>
				</p>
			</main>
		</Container>
	)
}

export default PrivacyPolicy
