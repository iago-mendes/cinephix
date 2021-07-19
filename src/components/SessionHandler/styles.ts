import styled from 'styled-components'

const Container = styled.div`
	height: calc(100vh - 5rem);

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2rem;

	img {
		width: 75vw;
		max-width: 60rem;
	}

	main {
		display: flex;
		align-items: center;
		justify-content: space-between;

		color: ${p => p.theme.primary};

		width: 75vw;
		max-width: 60rem;

		.message {
			font-family: Roboto;
			width: 75%;

			span {
				font-weight: 700;
				font-size: 3rem;
			}

			p {
				font-size: 2rem;
			}
		}

		button {
			display: flex;
			align-items: center;
			gap: 1rem;

			background: none;
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 100rem;
			padding: 1rem;

			color: ${p => p.theme.primary};
			cursor: pointer;
			transition: 0.25s;

			:hover {
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.1);
			}

			span {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;
			}
		}
	}

	@media (max-width: 700px) {
		img {
			width: 90vw;
		}

		main {
			flex-direction: column-reverse;
			gap: 2rem;

			width: 90vw;

			.message {
				width: 100%;
			}
		}
	}
`

export default Container
