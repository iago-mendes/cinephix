import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.primary};
	padding: 1rem;
	width: 30rem;
	height: 15rem;

	border-radius: 1rem;

	cursor: pointer;
	transition: 0.25s;

	:hover {
		border-radius: 0;
		background-color: ${p => p.theme.primary}bf;

		svg {
			border-radius: 0;
		}
	}

	svg {
		border-radius: 2.5rem;
		border: ${p => p.theme.background} 3px solid;

		transition: 0.25s;
	}

	.info {
		width: 75%;

		display: flex;
		flex-direction: column;
		gap: 1.5rem;

		.name {
			font-family: Ubuntu;
			font-size: 2.5rem;
			font-weight: 700;
		}

		.description {
			font-size: 1.5rem;
		}
	}
`
