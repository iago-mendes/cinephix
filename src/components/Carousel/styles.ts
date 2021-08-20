import styled from 'styled-components'

const Container = styled.div`
	overflow: hidden;
	position: relative;

	.slick-slider {
		position: relative;

		> .slick-prev {
			left: 0;
		}

		> .slick-next {
			right: 0;
		}

		> .slick-arrow {
			z-index: 1;

			background: ${p => p.theme.black}bf;
			background: ${p => p.theme.primary}80;
			background: ${p => p.theme.primary}bf;
			background: ${p => p.theme.background};
			color: ${p => p.theme.background};
			color: ${p => p.theme.primary};

			font-size: 3rem;
			font-weight: 700;
			box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
			border-radius: 0.5rem;

			display: flex;
			align-items: center;
			justify-content: center;

			width: 3rem;
			height: 100%;

			opacity: 0.5;
			transition: opacity 0.2s;

			:hover {
				opacity: 1;
				opacity: 0.9;
			}

			::before {
				display: none;
			}
		}
	}
`

export default Container
