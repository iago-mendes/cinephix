import {BsTools} from 'react-icons/bs'

import {Container} from './styles'
import SEOHead from '../SEOHead'

export function MaintenanceInfo() {
	return (
		<Container>
			<SEOHead />

			<div className="icon">
				<BsTools />
			</div>

			<div className="texts">
				<h1>Cinephix is under maintenance</h1>
				<h2>We'll be back as soon as possible</h2>
			</div>
		</Container>
	)
}
