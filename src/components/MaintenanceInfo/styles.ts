import styled from 'styled-components'

export const Container = styled.div`
	font-size: 2rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 3rem;

	height: 100vh;
	margin: auto;
	padding: 2rem;

	.icon {
		color: ${p => p.theme.primary};
		font-size: 10rem;

		height: fit-content;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.texts {
		color: ${p => p.theme.primary};

		height: fit-content;
	}

	@media (max-width: 800px) {
		flex-direction: column;
	}
`
