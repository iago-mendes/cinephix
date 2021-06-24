import styled from 'styled-components'

const Container = styled.div`
	.swiper {
		.swiper-slide {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.swiper-button-prev,
		.swiper-button-next {
			color: ${p => p.theme.primary};
			transition: 0.25s;

			:hover {
				transform: scale(1.1);
			}
		}
	}

	@media (min-width: 600px) {
		.swiper {
			padding-left: 5rem;
			padding-right: 5rem;

			.swiper-slide {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.swiper-button-prev,
			.swiper-button-next {
				width: 3.5rem;
				height: 6rem;
				border-radius: 100rem;

				color: ${p => p.theme.primary};
				transition: 0.25s;

				:hover {
					color: ${p => p.theme.background};
					background-color: ${p => p.theme.primary};

					box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
				}
			}
		}
	}
`

export default Container
