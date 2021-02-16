import styled from 'styled-components'

const Container = styled.div`
	width: 50vw;
	height: 75vh;

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

		button, a
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
		background-color: ${p => p.theme.background};		
	}

	@media(max-width: 600px)
	{
		width: 95vw;
		height: 85vh;

		main
		{
			flex-direction: column;
			justify-content: space-around;
			
			height: calc(85vh - 4.5rem);

			.img
			{
				width: 40vw;
				max-width: 30rem;
			}

			.info
			{
				margin: 0;
				width: 100%;
				height: fit-content;

				gap: 0.5rem;

				h1
				{
					font-size: 1.75rem;
				}

				.group
				{
					label
					{
						font-size: 1.5rem;
					}

					span
					{
						font-size: 1.25rem;
					}

					.rating label
					{
						font-size: 1.25rem;
					}
				}
			}
		}
	}
`

export default Container