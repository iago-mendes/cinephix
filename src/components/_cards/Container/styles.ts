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
	position: relative;

	background-color: ${p => p.theme.primary};
	width: ${p => p.cardWidth?.mobile || '30rem'};
	padding: 1rem;
	height: calc(
		(${p => p.cardWidth?.mobile || '30rem'} - 2rem) * 0.3 * 1.5 + 2rem
	);

	border-radius: 0.5rem;
	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

	text-decoration: none;

	cursor: pointer;
	transition: border-radius 0.2s, filter 0.2s, transform 0.2s;

	:hover {
		border-radius: 0;

		filter: brightness(0.8);
		transform: scale(0.95);

		> figure {
			border-radius: 0;
		}

		> .info .media-card {
			border-radius: 0;

			> figure {
				border-radius: 0;
			}
		}
	}

	> figure {
		width: 30%;
		border-radius: 0.5rem;
		overflow: hidden;

		transition: border-radius 0.2s;
	}

	> .info {
		width: 65%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		color: ${p => p.theme.background};

		> span.title {
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 1.75rem;
			height: 35%;

			overflow: hidden;
		}

		> span.subtitle {
			font-family: Ubuntu;
			font-weight: 400;

			font-size: 1.5rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		> p {
			font-size: 1.2rem;
			height: 45%;

			overflow: hidden;
		}

		> .media-card {
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 100%;
			padding: 0.5rem;
			height: 40%;
			background-color: rgba(0, 0, 0, 0.25);

			border-radius: 0.5rem;
			transition: border-radius 0.2s;

			> figure {
				width: 15%;
				overflow: hidden;

				border-radius: 0.5rem;
				transition: border-radius 0.2s;
			}

			> .info {
				width: 80%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;

				color: ${p => p.theme.background};
				overflow: hidden;

				span.title {
					font-family: Ubuntu;
					font-weight: 700;

					font-size: 1.5rem;
				}

				span.date {
					font-family: Ubuntu;
					font-size: 1.25rem;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
				}
			}
		}
	}

	@media (min-width: 600px) {
		width: ${p => p.cardWidth?.desktop || '40rem'};
		height: calc(
			(${p => p.cardWidth?.desktop || '40rem'} - 2rem) * 0.3 * 1.5 + 2rem
		);

		> .info {
			h1 {
				font-size: 2.5rem;
			}

			p {
				font-size: 1.5rem;
			}
		}
	}
`
