import Image from 'next/image'

import Container from '../../styles/pages/about/index'
import SEOHead from '../../components/SEOHead'
import logoName from '../../assets/images/logo/name.svg'
import logoIcon from '../../assets/images/logo/icon.svg'
import Link from 'next/link'

const About: React.FC = () => {
	return (
		<Container className="page">
			<SEOHead title="About | Cinephix" />

			<header>
				<div className="icon">
					<Image
						src={logoIcon}
						width={1000}
						height={1000}
						layout="responsive"
					/>
				</div>
				<div className="name">
					<Image src={logoName} width={1000} height={200} layout="responsive" />
				</div>
			</header>

			<main>
				<div className="question">
					<h1>What is Cinephix?</h1>

					<p>
						The Cinephix application is a place where people passionate about
						movies and TV shows can pursue their interest. Here, you can search
						and discover new content, as well as organize your entertainment
						media. For example, you can separate your TV shows by status, add
						movies to your watch list, rate all your media, and more.
					</p>
				</div>
				<div className="question">
					<h1>Do I need to create an account?</h1>

					<p>
						No, you don't! You can access our public pages without any kind of
						log in; if you want to make use of our user-specific features, all
						you have to do is sign in with your Google account!
					</p>

					<p>
						We know how frustrating it is to have many accounts created
						throughout the web, which is why we decided to take the approach of
						using an account that you probably already have.
					</p>
				</div>
			</main>

			<div className="links">
				<Link href="/about/privacy-policy">Privacy Policy</Link>
				<Link href="/about/terms-and-conditions">Terms & Conditions</Link>
				<Link href="/about/disclaimer">Disclaimer</Link>
				<Link href="/about/media-data">Media data</Link>
			</div>
		</Container>
	)
}

export default About
