import {Trans} from '@lingui/macro'

import Container from './styles'
import useDimensions from '../../../hooks/useDimensions'
import {LeaderboardAd, LargeMobileBannerAd} from '../../../utils/adUnits'

const HorizontalAd: React.FC = () => {
	const {width} = useDimensions()

	if (width < 360) return null

	return (
		<Container>
			<span>
				<Trans>Advertisement</Trans>
			</span>

			<div>
				{width < 800 && <LargeMobileBannerAd />}

				{width >= 800 && <LeaderboardAd />}
			</div>
		</Container>
	)
}

export default HorizontalAd
