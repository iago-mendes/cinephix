import {FiX} from 'react-icons/fi'
import {BiExpand} from 'react-icons/bi'
import Link from 'next/link'

import Container from './styles'
import {useAvoidScroll} from '../../../hooks/useAvoidScroll'
import {PropsWithChildren} from 'react'

type Props = {
	isOpen: boolean
	handleClose: () => void

	expandLink?: string
	display?: string

	showCompleteContainer?: boolean
}

const ModalContainer = ({
	isOpen,
	handleClose,
	expandLink,
	display,
	showCompleteContainer = true,
	children
}: PropsWithChildren<Props>) => {
	useAvoidScroll(isOpen)

	if (!isOpen) return null

	if (!showCompleteContainer) return <Container>{children}</Container>

	return (
		<Container>
			<div className="modal-content">
				<header>
					{expandLink && (
						<Link
							href={expandLink}
							className="expand"
							title="Expand"
							onClick={handleClose}
						>
							<BiExpand size={25} />
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
