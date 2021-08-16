import styled from 'styled-components'

type Props = {
	cardWidth?: {
		mobile: string | number
		desktop: string | number
	}
}

export const Container = styled.div<Props>`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.primary};
	width: ${p => p.cardWidth?.mobile || '30rem'};
	padding: 1rem;
	height: calc(
		(${p => p.cardWidth?.mobile || '30rem'} - 2rem) * 0.3 * 1.5 + 2rem
	);

	border-radius: 1rem;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

	text-decoration: none;

	cursor: pointer;
	transition: 0.25s;

	:hover {
		border-radius: 0;
		background-color: ${p => p.theme.primary}bf;

		.img img {
			border-radius: 0;
		}
	}

	figure {
		width: 30%;

		img {
			border-radius: 1rem;
			transition: 0.25s;
		}
	}

	.info {
		width: 65%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		color: ${p => p.theme.background};

		h1 {
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 1.75rem;
			height: 35%;

			overflow: hidden;
		}

		h3 {
			font-family: Ubuntu;
			font-weight: 400;

			font-size: 1.5rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		p {
			font-family: Roboto;
			font-weight: 400;

			font-size: 1.2rem;
			height: 45%;

			overflow: hidden;
		}
	}

	@media (min-width: 600px) {
		width: ${p => p.cardWidth?.desktop || '40rem'};
		height: calc(
			(${p => p.cardWidth?.desktop || '40rem'} - 2rem) * 0.3 * 1.5 + 2rem
		);

		.info {
			h1 {
				font-size: 2.5rem;
			}

			p {
				font-size: 1.5rem;
			}
		}
	}
`
