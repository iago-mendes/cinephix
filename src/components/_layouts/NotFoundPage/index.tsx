import SEOHead from '../../SEOHead'
import {Container} from './styles'

export function NotFoundPageLayout() {
	return (
		<Container className="page">
			<SEOHead />

			<span className="code">404</span>
			<div className="divider" />
			<span className="message">This page could not be found.</span>
		</Container>
	)
}
