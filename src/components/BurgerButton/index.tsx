import {motion} from 'framer-motion'

import {Container} from './styles'

type Props = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export function BurgerButton({isOpen, setIsOpen}: Props) {
	const variant = isOpen ? 'opened' : 'closed'

	const top = {
		closed: {
			rotate: 0,
			translateY: 0
		},
		opened: {
			rotate: 45,
			translateY: 2
		}
	}

	const center = {
		closed: {
			opacity: 1
		},
		opened: {
			opacity: 0
		}
	}

	const bottom = {
		closed: {
			rotate: 0,
			translateY: 0
		},
		opened: {
			rotate: -45,
			translateY: -2
		}
	}

	const width = 30
	const height = (width / 64) * 24
	const unitHeight = 4
	const unitWidth = (unitHeight * (width as number)) / (height as number)

	const lineProps = {
		vectorEffect: 'non-scaling-stroke',
		initial: 'closed',
		animate: variant,
		transition: {type: 'spring', stiffness: 250, damping: 15}
	}

	return (
		<Container onClick={() => setIsOpen(!isOpen)}>
			<motion.svg
				viewBox={`0 0 ${unitWidth} ${unitHeight}`}
				preserveAspectRatio="none"
				width={width}
				height={height}
			>
				<motion.line
					x1="0"
					x2={unitWidth}
					y1="0"
					y2="0"
					variants={top}
					{...lineProps}
				/>
				<motion.line
					x1="0"
					x2={unitWidth}
					y1="2"
					y2="2"
					variants={center}
					{...lineProps}
				/>
				<motion.line
					x1="0"
					x2={unitWidth}
					y1="4"
					y2="4"
					variants={bottom}
					{...lineProps}
				/>
			</motion.svg>
		</Container>
	)
}
