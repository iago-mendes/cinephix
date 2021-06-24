import styled from 'styled-components'

interface ContainerProps {
	color: string
}

const Container = styled.div<ContainerProps>`
	header {
		width: 100%;
		padding: 2rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		color: ${p => p.color};
		border-bottom: ${p => p.color} 2px solid;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);

		.name {
			font-family: Ubuntu;
			font-size: 3rem;
			font-weight: 700;
		}

		.description {
			font-size: 2rem;
			text-align: justify;
		}
	}

	.actions {
		width: 100%;
		padding: 5rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		button {
			background: none;
			color: ${p => p.theme.primary};
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 100rem;

			display: flex;
			align-items: center;
			gap: 1rem;

			padding: 0.5rem 1rem;
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

	.category {
		display: flex;
		flex-direction: column;
		gap: 3rem;

		padding: 3rem 0;

		:nth-child(odd) {
			background-color: rgba(0, 0, 0, 0.5);
		}

		.header {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			padding: 0 2rem;

			.name {
				font-size: 2.5rem;
				font-weight: 700;
				color: ${p => p.theme.primary};

				padding-left: 1rem;
				border-left: ${p => p.theme.primary} 5px solid;
			}

			.description {
				font-size: 1.75rem;
				color: ${p => p.theme.primary};

				margin-left: 2rem;
			}
		}
	}
`

export default Container
