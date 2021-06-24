import styled from 'styled-components'

const Container = styled.div`
	background-color: ${p => p.theme.green};

	display: flex;
	flex-direction: column;
	gap: 5rem;

	header {
		display: flex;
		align-items: center;
		justify-content: space-around;

		padding: 1rem;

		.icon {
			width: 20%;
		}

		.name {
			width: 50%;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		.question {
			width: 100%;
			padding-left: 5rem;
			padding-right: 5rem;

			display: flex;
			flex-direction: column;
			gap: 0.5rem;

			h1 {
				font-size: 3rem;
				font-family: Ubuntu;
				color: ${p => p.theme.textBlack};

				border-left: ${p => p.theme.textBlack} 5px solid;
				padding-left: 1rem;
			}

			p {
				margin-left: 2rem;

				font-size: 2rem;
				font-family: Roboto;
				color: ${p => p.theme.textBlack};
			}
		}
	}

	.links {
		width: 100%;
		padding: 2rem;
		margin-bottom: 5rem;

		display: grid;
		grid-auto-rows: 5rem;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		grid-gap: 2rem;
		align-items: center;
		justify-items: center;

		a {
			font-size: 2.5rem;
			font-family: Ubuntu;
			color: ${p => p.theme.textBlack};

			text-decoration: none;
			cursor: pointer;

			::after {
				content: '';
				width: 0px;
				height: 3px;

				display: block;
				background: ${p => p.theme.textBlack};
				transition: 0.25s;
			}

			:hover::after {
				width: 100%;
			}
		}
	}

	@media (max-width: 700px) {
		gap: 2rem;

		header {
			flex-direction: column;
			gap: 1rem;

			.icon {
				width: 50%;
			}

			.name {
				width: 75%;
			}
		}

		main .question {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
`

export default Container
