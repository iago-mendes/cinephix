import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	.search {
		background-color: ${p => p.theme.white};
		height: 4rem;
		width: 75%;

		display: flex;
		align-items: center;
		gap: 1rem;

		padding-left: 1rem;
		padding-right: 2rem;
		margin: 1rem 0;

		color: ${p => p.theme.secondary};
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);

		border-radius: 100rem;
		transition: 0.25s;

		:hover {
			transform: scale(1.03);
		}

		input {
			width: 100%;
			height: 90%;

			font-family: Ubuntu;
			font-weight: 700;
			font-size: 2rem;

			color: ${p => p.theme.secondary};
			background: none;
			border: none;
		}
	}

	.scroll {
		width: 100%;
		height: calc(85vh - 12rem);
		overflow-y: auto;

		::-webkit-scrollbar {
			height: 1rem;
			width: 1rem;
		}

		::-webkit-scrollbar-track {
			background-color: #242329;
			border-radius: 1rem;
		}

		::-webkit-scrollbar-thumb {
			background-color: #4d4d5a;
			border-radius: 1rem;

			:hover {
				background-color: #3b3b45;
			}
		}
	}

	@media (max-width: 600px) {
		width: 95vw;

		.search {
			input {
				font-size: 1.75rem;
			}
		}
	}
`

export default Container
