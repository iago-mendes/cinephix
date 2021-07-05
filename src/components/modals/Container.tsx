import {FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'
import Link from 'next/link'

import Container from '../../styles/components/modals/Container'
import {useAvoidScroll} from '../../hooks/useAvoidScroll'

type Props = {
	isOpen: boolean
	handleClose: () => void

	expandLink?: string
	display?: string
}

const ModalContainer: React.FC<Props> = ({
	isOpen,
	handleClose,
	expandLink,
	display,
	children
}) => {
	useAvoidScroll(isOpen)

	if (!isOpen) return null

	return (
		<Container>
			<div className="modal-content">
				<header>
					{expandLink && (
						<Link href={expandLink}>
							<a className="expand" title="Expand" onClick={handleClose}>
								<BiExpand size={25} />
							</a>
						</Link>
					)}

					{display && <span>{display}</span>}

					<button className="close" title="Close" onClick={handleClose}>
						<FiX size={25} />
					</button>
				</header>

				<div className="modal-scrollable-content">{children}</div>
			</div>
		</Container>
	)
}

export default ModalContainer
