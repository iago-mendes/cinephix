import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 1rem;

	> .divider {
		margin: 0 2rem;
		width: 0.25rem;
		height: 5rem;
		background-color: ${p => p.theme.primary};
	}

	> span {
		color: ${p => p.theme.primary};
		font-family: Ubuntu;

		&.code {
			font-size: 3rem;
		}

		&.message {
			font-size: 2rem;
		}
	}
`
