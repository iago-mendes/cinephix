import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;

	padding: 1rem;

	position: relative;
	height: 100%;

	.img {
		width: calc((75vh - 5rem - 2rem) / 1.5);
		max-width: (50vw - 2rem) / 2;

		img {
			border-radius: 0.5rem;
		}
	}

	.info {
		margin-right: 3rem;
		width: calc((50vw - 2rem) / 2 - 3rem - 3rem);
		height: calc(75vh - 4.5rem - 2rem);

		color: ${p => p.theme.primary};
		font-family: Roboto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 2rem;

		h1 {
			font-family: Ubuntu;
			font-size: 3rem;
		}

		.group {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			label {
				font-size: 2rem;
				font-weight: 700;
				color: ${p => p.theme.primary};
				padding-left: 1rem;
				border-left: ${p => p.theme.primary} 5px solid;
			}

			span {
				margin-left: 2rem;
				font-size: 1.75rem;

				display: flex;
				align-items: center;
			}

			.stars svg {
				font-size: 1.5rem;
			}

			.rating {
				display: flex;
				align-items: center;
				gap: 1rem;

				label {
					border: none;
					padding: 0;
					margin-left: 2rem;

					font-size: 1.75rem;
					font-weight: 400;
				}

				span {
					margin: 0;
				}
			}
		}
	}

	.edit {
		position: absolute;
		bottom: 1rem;
		right: 1rem;

		background: none;
		border: none;
		color: ${p => p.theme.primary};

		width: 4rem;
		height: 4rem;
		border-radius: 100rem;

		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;
		transition: 0.25s;

		:hover {
			background-color: ${p => p.theme.primary};
			color: ${p => p.theme.background};

			transform: scale(1.1);
		}
	}

	@media (max-width: 1000px) {
		flex-direction: column;
		gap: 1rem;

		height: fit-content;

		.img {
			width: 75vw;
			max-width: 30rem;
		}

		.info {
			margin: 0;
			width: 100%;
			height: fit-content;

			gap: 1rem;
		}
	}
`

export default Container
