import styled from 'styled-components'

const Container = styled.div`
	width: 50vw;
	height: 75vh;

	background-color: ${p => p.theme.background};
	border-radius: 0.5rem;

	header
	{
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 0.5rem;
		padding-left: 2rem;
		padding-right: 2rem;

		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		background-color: ${p => p.theme.secondary};

		button
		{
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 100rem;

			background: none;
			border: none;
			color: ${p => p.theme.primary};

			display: flex;
			align-items: center;
			justify-content: center;

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				background-color: ${p => p.theme.primary};
				color: ${p => p.theme.secondary};
			}
		}
	}

	main
	{
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		padding: 1rem;

		.img
		{
			width: calc((75vh - 4.5rem - 2rem) / 1.5);
			max-width: (50vw - 2rem) / 2;

			img
			{
				border-radius: 0.5rem;
			}
		}

		.info
		{
			margin-right: 3rem;
			width: calc((50vw - 2rem) / 2 - 3rem - 3rem);
			height: calc(75vh - 4.5rem - 2rem);

			color: ${p => p.theme.primary};
			font-family: Roboto;

			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 2rem;

			h1
			{
				font-family: Ubuntu;
				font-size: 3rem;
			}

			.group
			{
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				label
				{
					font-size: 2rem;
					font-weight: 700;
					color: ${p => p.theme.primary};
					padding-left: 1rem;
					border-left: ${p => p.theme.primary} 5px solid;
				}

				span
				{
					margin-left: 2rem;
					font-size: 1.75rem;

					display: flex;
					align-items: center;
				}

				.rating
				{
					display: flex;
					align-items: center;
					gap: 1rem;

					label
					{
						border: none;
						padding: 0;
						margin-left: 2rem;

						font-size: 1.75rem;
						font-weight: 400;
					}

					span
					{
						margin: 0;
					}
				}
			}
		}
	}
`

export default Container