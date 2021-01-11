import styled from 'styled-components'

const Container = styled.div`
	main
	{
		height: calc(100vh - 5rem);
		padding: 2rem;

		display: flex;
		justify-content: space-between;

		.img
		{
			width: calc((100vh - 5rem - 4rem) / 1.5);
			max-width: calc(50% - 5rem);

			img
			{
				border-radius: 1rem;
			}
		}

		.info
		{
			height: 100%;
			width: 50%;
			margin-right: 5rem;

			display: flex;
			flex-direction: column;
			gap: 2rem;

			color: ${p => p.theme.primary};

			h1
			{
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 4rem;
			}

			.details
			{
				display: flex;
				align-items: center;
				justify-content: space-around;

				.detail
				{
					display: flex;
					align-items: center;
					gap: 1rem;

					span
					{
						font-family: Ubuntu;
						font-weight: 400;
						font-size: 2rem;
					}
				}
			}

			p
			{
				font-family: Roboto;
				font-size: 2rem;
			}
		}
	}
`

export default Container