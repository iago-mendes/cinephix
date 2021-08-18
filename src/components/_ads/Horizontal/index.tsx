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

			{width >= 800 && <LeaderboardAd />}

			{width < 800 && <LargeMobileBannerAd />}
		</Container>
	)
}

export default HorizontalAd