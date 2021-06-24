import styled from 'styled-components'

const Container = styled.div`
	color: ${p => p.theme.primary};

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	gap: 2rem;

	width: 100%;
	min-height: 100%;
	padding: 2rem 1rem;

	h1 {
		font-family: Ubuntu;
		font-size: 2.5rem;
	}

	.grid {
		width: 100%;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		grid-gap: 2rem;
		align-items: center;
		justify-items: center;

		.banner {
			width: 25rem;
			position: relative;

			cursor: pointer;
			transition: 0.25s;

			:hover {
				transform: scale(1.1);
			}

			span {
				position: absolute;
				right: 0;
				bottom: 0;

				background-color: ${p => p.theme.background}bf;
				padding: 1rem 2rem;

				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;
			}
		}

		.selected {
			border: ${p => p.theme.primary} 5px solid;
		}
	}
`

export default Container
