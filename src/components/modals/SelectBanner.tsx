import Container from '../../styles/components/modals/SelectBanner'
import ModalContainer from './Container'

interface SelectBannerModalProps
{
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	banner: string
	setBanner: (p: string) => void
}

const SelectBannerModal: React.FC<SelectBannerModalProps> =
({isOpen, setIsOpen, banner, setBanner}) =>
{
	return (
		<ModalContainer
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<Container>
				<h1>
					Choose a banner
				</h1>

				<div className='grid' >
				</div>
			</Container>
		</ModalContainer>
	)
}

export default SelectBannerModal