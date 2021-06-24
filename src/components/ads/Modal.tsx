import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {FiX} from 'react-icons/fi'
import Modal from 'react-modal'

import Container from '../../styles/components/ads/Modal'
import {modalStyle} from '../../styles/global'
import {LargeSkyscraperAd} from '../../utils/adUnits'

Modal.setAppElement('#__next')

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
		<Modal isOpen={isOpen} style={modalStyle}>
			<Container>
				<div className="close">
					<button onClick={() => setIsOpen(false)}>
						<FiX />
					</button>
				</div>

				<main>
					<span>Advertisement</span>

					<LargeSkyscraperAd />
				</main>
			</Container>
		</Modal>
	)
}

export default ModalAd
