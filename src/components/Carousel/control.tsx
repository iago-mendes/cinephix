import {BsCaretLeft, BsCaretRight} from 'react-icons/bs'

type Props = React.HTMLAttributes<HTMLButtonElement> & {
	direction: 'left' | 'right'
}

export function Control({direction, ...props}: Props) {
	return (
		<button {...props}>
			{direction === 'left' && <BsCaretLeft />}
			{direction === 'right' && <BsCaretRight />}
		</button>
	)
}
