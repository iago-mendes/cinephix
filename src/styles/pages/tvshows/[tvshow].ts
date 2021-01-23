import styled from 'styled-components'

interface ContainerProps
{
	overviewLength: number
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
				gap: 2rem;

				padding-left: 5rem;
				padding-right: 5rem;

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

				.group
				{
					display: flex;
					align-items: center;
					justify-content: space-between;

					width: 100%;
				}
			}

			p
			{
				font-family: Roboto;
				font-size: ${p => p.overviewLength < 500 ? '2rem' : '1.5rem'};
			}

			ul
			{
				width: 100%;

				display: grid;
				grid-auto-rows: 5rem;
				grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
				grid-gap: 1rem;
				align-items: center;
				justify-items: center;

				li
				{
					display: flex;
					align-items: center;
					justify-content: center;

					text-decoration: none;

					padding: 0.75rem;
					padding-left: 2rem;
					padding-right: 2rem;

					border: ${p => p.theme.primary} 1px solid;
					border-radius: 100rem;

					font-family: Ubuntu;
					font-weight: 400;
					font-size: 1.75rem;
				}
			}
		}
	}

	.row
	{
		display: flex;

		padding: 1rem;
		padding-top: 3rem;
		padding-bottom: 3rem;

		:nth-child(even)
		{
			background-color: rgba(0,0,0,0.5);
		}
	}

	.userTvshow
	{
		align-items: center;
		justify-content: center;
		gap: 15rem;

		.add
		{
			display: flex;
			align-items: center;
			gap: 1rem;

			background: none;
			border: ${p => p.theme.primary} 2px solid;
			border-radius: 100rem;
			padding: 1rem;

			color: ${p => p.theme.primary};
			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.background};

				transform: scale(1.05);
			}

			span
			{
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;
			}
		}

		.group
		{
			display: flex;
			flex-direction: column;

			color: ${p => p.theme.primary};

			label
			{
				font-family: Roboto;
				font-weight: 700;
				font-size: 3rem;

				padding-left: 1rem;
				border-left: ${p => p.theme.primary} 5px solid;
			}

			span
			{
				font-family: Roboto;
				font-size: 2rem;

				margin-left: 2rem;

				display: flex;
				align-items: center;
				
			}
		}
	}

	.carousel
	{
		flex-direction: column;
		gap: 3rem;

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
`

export default Container