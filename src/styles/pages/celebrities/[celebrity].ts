import styled from 'styled-components'

interface ContainerProps
{
	biographyLength: number
}

const Container = styled.div<ContainerProps>`
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
			justify-content: space-around;
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
				flex-direction: column;
				align-items: center;
				gap: 2rem;

				.detail
				{
					display: flex;
					align-items: center;
					gap: 1rem;

					strong
					{
						font-family: Ubuntu;
						font-weight: 700;
						font-size: 2rem;
					}

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
				font-size: ${p => p.biographyLength < 1500 ? '1.5rem' : '1.25rem'};
			}
		}
	}

	.cast, .crew
	{
		display: flex;
		flex-direction: column;
		gap: 3rem;

		padding: 1rem;
		padding-top: 3rem;
		padding-bottom: 3rem;

		span
		{
			font-family: Roboto;
			font-weight: 700;
			font-size: 3rem;
			color: ${p => p.theme.primary};

			margin-left: 5rem;
			padding-left: 1rem;
			border-left: ${p => p.theme.primary} 5px solid;
		}
	}

	.cast
	{
		background-color: rgba(0,0,0,0.5);
	}

	@media(max-width: 1000px)
	{
		main
		{
			height: fit-content;

			flex-direction: column;
			align-items: center;

			.img
			{
				width: 75vw;
				max-width: 40rem;
			}

			.info
			{
				width: 100%;
				margin: 0;
				margin-top: 2rem;

				h1
				{
					font-size: 3rem;
				}

				.details
				{
					flex-direction: column;
					align-items: flex-start;
					gap: 1rem;
				}
			}
		}
	}
`

export default Container