import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	header
	{
		padding: 1rem 2rem;

		h1
		{
			color: ${p => p.theme.primary};
			font-family: Ubuntu;
			font-size: 3rem;
		}
	}

	main
	{
		width: 100%;

		display: grid;
		grid-auto-rows: 20rem;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-gap: 5rem;
		align-items: center;
		justify-items: center;
		
		padding: 1rem;

		.add
		{
			display: flex;
			align-items: center;
			justify-content: center;

			border: none;
			background: none;
			color: ${p => p.theme.primary};
			border: ${p => p.theme.primary} 2px solid;

			width: 4rem;
			height: 4rem;
			border-radius: 100rem;

			cursor: pointer;
			transition: 0.25s;

			:hover
			{
				color: ${p => p.theme.background};
				background-color: ${p => p.theme.primary};

				transform: scale(1.5);
			}
		}

		.group
		{
			width: 20rem;
			height: 20rem;
			background-color: ${p => p.theme.primary};
			box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

			border-radius: 0.5rem;
			padding: 1rem;

			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 1rem;

			transition: 0.25s;

			:hover
			{
				border-radius: 0;
				background-color: ${p => p.theme.primary}bf;

				.event svg
				{
					border-radius: 0;
				}
			}

			.nickname
			{
				font-family: Ubuntu;
				font-size: 2.25rem;
				font-weight: 700;
			}

			.description
			{
				font-size: 1.75rem;
			}

			.event
			{
				display: flex;
				align-items: center;
				gap: 0.5rem;

				padding: 2rem 0;
				border-top: ${p => p.theme.background} 2px solid;

				svg
				{
					border-radius: 1.5rem;
					border: ${p => p.theme.background} 3px solid;

					transition: 0.25s;
				}

				.name
				{
					font-family: Ubuntu;
					font-size: 2rem;
					font-weight: 700;
				}
			}

			.info
			{
				width: 75%;

				display: flex;
				flex-direction: column;
				gap: 1.5rem;


				.description
				{
					font-size: 1.5rem;
				}
			}
		}
	}
`

export default Container