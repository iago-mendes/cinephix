import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {FiX} from 'react-icons/fi'
import {Trans} from '@lingui/macro'

import Container from '../../styles/components/ads/Modal'
import {LargeSkyscraperAd} from '../../utils/adUnits'
import ModalContainer from '../modals/Container'

const ModalAd: React.FC = () => {
	const {pathname} = useRouter()

	const [isOpen, setIsOpen] = useState(false)
	const [navigationCount, setNavigationCount] = useState(0)
	const [nextAppearance, setNextAppearance] = useState(5)
	const [multiplier, setMultiplier] = useState(2)

	useEffect(() => {
		const tmpNavigationCount = navigationCount + 1
		setNavigationCount(tmpNavigationCount)
	}, [pathname])

	useEffect(() => {
		if (navigationCount === nextAppearance) {
			setIsOpen(true)

			const tmpNextAppearance = nextAppearance * multiplier
			setNextAppearance(tmpNextAppearance)

			const tmpMultiplier = multiplier + 1
			setMultiplier(tmpMultiplier)
		}
	}, [navigationCount])

	return (
		<ModalContainer
			isOpen={isOpen}
			handleClose={() => setIsOpen(false)}
			showCompleteContainer={false}
		>
			<Container>
				<div className="close">
					<button onClick={() => setIsOpen(false)}>
						<FiX />
					</button>
				</div>

				<main>
					<span>
						<Trans>Advertisement</Trans>
					</span>

					<LargeSkyscraperAd />
				</main>
			</Container>
		</ModalContainer>
	)
}

export default ModalAd
