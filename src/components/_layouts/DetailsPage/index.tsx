import {Container} from './styles'
import Loading from '../../Loading'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	isLoading?: boolean
	overviewLength?: number
}

export function DetailsPageLayout({
	isLoading = false,
	overviewLength = 200,
	children,
	...props
}: Props) {
	if (isLoading)
		return <Loading style={{marginTop: '50vh', marginBottom: '50vh'}} />

	return (
		<Container overviewLength={overviewLength} {...props}>
			{children}
		</Container>
	)
}
