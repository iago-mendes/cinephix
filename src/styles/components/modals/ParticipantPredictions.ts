import styled from 'styled-components'

const Container = styled.div`
	color: ${p => p.theme.primary};

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2rem;

	width: 100%;
	min-height: 100%;
	padding: 2rem 1rem;

	h1
	{
		font-family: Ubuntu;
		font-size: 2.5rem;
	}

	.grid
	{
		width: 100%;

		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		grid-gap: 2rem;
		align-items: center;
		justify-items: center;

		.prediction
		{
			display: flex;
			flex-direction: column;
			gap: 1rem;

			width: 90%;
			padding-left: 1.5rem;

			h2
			{
				color: ${p => p.theme.primary};
				font-weight: 700;
				font-size: 2rem;

				border-left: ${p => p.theme.primary} 5px solid;
				padding-left: 1rem;
				margin-left: -1.5rem;
			}
		}
	}

	@media(min-width: 600px)
	{
		.grid
		{
			grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
		}
	}
`

export default Container