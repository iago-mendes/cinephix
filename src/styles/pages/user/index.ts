import styled from 'styled-components'

const Container = styled.div`
	main {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 2rem;

		border-bottom: ${p => p.theme.primary} 2px solid;

		img {
			width: 15rem;
			border-radius: 1rem;
		}

		.group {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			color: ${p => p.theme.primary};
			font-family: Roboto;

			h1 {
				font-size: 4rem;
			}

			h2 {
				font-size: 3rem;
			}

			p {
				font-size: 2rem;
			}
		}

		.delete {
			background: none;
			border: ${p => p.theme.delete} 2px solid;
			border-radius: 1rem;

			display: flex;
			align-items: center;
			gap: 1rem;

			padding: 1rem;
			color: ${p => p.theme.delete};

			cursor: pointer;
			transition: 0.25s;

			:hover {
				background-color: ${p => p.theme.delete};
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

	.links {
		display: flex;
		align-items: center;
		justify-content: space-around;

		padding: 5rem;

		a {
			text-decoration: none;
			font-family: Ubuntu;
			font-weight: 700;
			font-size: 3rem;

			color: ${p => p.theme.primary};
			display: inline-block;

			::after {
				content: '';
				width: 0px;
				height: 5px;
				display: block;
				background: ${p => p.theme.primary};
				transition: 0.25s;
			}

			:hover::after {
				width: 100%;
			}

			span {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
			}
		}
	}

	@media (max-width: 1000px) {
		main {
			flex-direction: column;
			gap: 4rem;

			.group {
				h1 {
					font-size: 2.5rem;
				}

				h2 {
					font-size: 2rem;
				}
			}
		}

		.links {
			flex-direction: column;
			align-items: flex-start;
			gap: 2rem;

			a {
				font-size: 2.25rem;
			}
		}
	}

	@media (min-width: 1000px) {
		main {
			padding: 10rem 2rem;
		}
	}
`

export default Container
