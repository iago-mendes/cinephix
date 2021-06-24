import Image from 'next/image'

import banners from '../../../db/banners.json'
import Container from '../../styles/components/modals/SelectBanner'
import getBanner from '../../utils/getBanner'
import ModalContainer from './Container'

interface SelectBannerModalProps {
	isOpen: boolean
	setIsOpen: (p: boolean) => void

	banner: string
	setBanner: (p: string) => void
}

const SelectBannerModal: React.FC<SelectBannerModalProps> = ({
	isOpen,
	setIsOpen,
	banner: selected,
	setBanner
}) => {
	function handleSelectBanner(banner: string) {
		setBanner(banner)
		setIsOpen(false)
	}

	return (
		<ModalContainer isOpen={isOpen} handleClose={() => setIsOpen(false)}>
			<Container>
				<h1>Choose a banner</h1>

				<div className="grid">
					{banners.map((banner, index) => (
						<div
							className={
								banner.path === selected ? 'selected banner' : 'banner'
							}
							key={index}
							onClick={() => handleSelectBanner(banner.path)}
						>
							<Image
								src={getBanner(banner.path)}
								width={1500}
								height={750}
								layout="responsive"
								quality={25}
							/>
							<span>{banner.alt}</span>
						</div>
					))}
				</div>
			</Container>
		</ModalContainer>
	)
}

export default SelectBannerModal
