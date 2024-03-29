import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {FiX} from 'react-icons/fi'
import {Trans} from '@lingui/macro'

import Container from './styles'
import {LargeSkyscraperAd} from '../adUnits'
import ModalContainer from '../../_modals/Container'

const ModalAd: React.FC = () => {
	return null
	const {pathname} = useRouter()

	const [isOpen, setIsOpen] = useState(false)
	const [navigationCount, setNavigationCount] = useState(0)
	const [nextAppearance, setNextAppearance] = useState(5)
	const [multiplier, setMultiplier] = useState(2)

	useEffect(() => {
		const tmpNavigationCount = navigationCount + 1
		setNavigationCount(tmpNavigationCount)
	}, [navigationCount, pathname])

	useEffect(() => {
		if (navigationCount === nextAppearance) {
			setIsOpen(true)

			const tmpNextAppearance = nextAppearance * multiplier
			setNextAppearance(tmpNextAppearance)

			const tmpMultiplier = multiplier + 1
			setMultiplier(tmpMultiplier)
		}
	}, [multiplier, navigationCount, nextAppearance])

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

					<div>
						<LargeSkyscraperAd />
					</div>
				</main>
			</Container>
		</ModalContainer>
	)
}

export default ModalAd
