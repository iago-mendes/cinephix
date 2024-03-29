import Container from '../../styles/pages/about/global'
import SEOHead from '../../components/SEOHead'

const PrivacyPolicy: React.FC = () => {
	return (
		<Container className="page">
			<SEOHead title="Disclaimer | Cinephix" />

			<main>
				<h1>Disclaimer for Cinephix</h1>

				<p>
					If you require any more information or have any questions about our
					site's disclaimer, please feel free to contact us. Our Disclaimer was
					generated with the help of the{' '}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.disclaimergenerator.org/"
					>
						Disclaimer Generator
					</a>
				</p>

				<h2>Disclaimers for Cinephix</h2>

				<p>
					All the information on this website - cinephix.com - is published in
					good faith and for general information purpose only. Cinephix does not
					make any warranties about the completeness, reliability and accuracy
					of this information. Any action you take upon the information you find
					on this website (Cinephix), is strictly at your own risk. Cinephix
					will not be liable for any losses and/or damages in connection with
					the use of our website.
				</p>

				<p>
					From our website, you can visit other websites by following hyperlinks
					to such external sites. While we strive to provide only quality links
					to useful and ethical websites, we have no control over the content
					and nature of these sites. These links to other websites do not imply
					a recommendation for all the content found on these sites. Site owners
					and content may change without notice and may occur before we have the
					opportunity to remove a link which may have gone 'bad'.
				</p>

				<p>
					Please be also aware that when you leave our website, other sites may
					have different privacy policies and terms which are beyond our
					control. Please be sure to check the Privacy Policies of these sites
					as well as their "Terms of Service" before engaging in any business or
					uploading any information. Our Privacy Policy was created by{' '}
					<a
						target="_blank"
						rel="noreferrer"
						href="https://www.generateprivacypolicy.com/"
					>
						the Privacy Policy Generator
					</a>
					.
				</p>

				<h2>Consent</h2>

				<p>
					By using our website, you hereby consent to our disclaimer and agree
					to its terms.
				</p>

				<h2>Update</h2>

				<p>
					Should we update, amend or make any changes to this document, those
					changes will be prominently posted here.
				</p>
			</main>
		</Container>
	)
}

export default PrivacyPolicy
