import styled from 'styled-components'

const Container = styled.div`
	header
	{
		background-color: ${p => p.theme.blue};

		display: flex;
		align-items: center;
		justify-content: space-around;

		height: 30rem;
		position: relative;

		box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

		.icons
		{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;

			height: 100%;

			img
			{
				max-width: 10rem;
				max-height: 10rem;

				:nth-child(even)
				{
					margin-left: 10rem;
					transform: rotate(25deg);
				}

				:nth-child(odd)
				{
					margin-right: 10rem;
					transform: rotate(-25deg);
				}
			}

			:last-of-type
			{
				img:nth-child(odd)
				{
					margin: 0;
					margin-left: 10rem;
					transform: rotate(25deg);
				}

				img:nth-child(even)
				{
					margin: 0;
					margin-right: 10rem;
					transform: rotate(-25deg);
				}
			}
		}

		.logo
		{
			width: 50rem;
		}

		.search
		{
			position: absolute;
			bottom: -2rem;
			z-index: 1;

			background-color: ${p => p.theme.white};
			width: 50rem;
			height: 4rem;

			display: flex;
			align-items: center;
			gap: 1rem;

			padding-left: 1rem;
			padding-right: 2rem;
			border-radius: 100rem;

			color: ${p => p.theme.blue};
			box-shadow: 0px 5px 5px rgba(0,0,0,0.5);

			input
			{
				width: 100%;
				height: 90%;

				font-family: Ubuntu;
				font-weight: 700;
				font-size: 2rem;

				color: ${p => p.theme.blue};
				background: none;
				border: none;
			}
		}
	}

	main
	{
		display: grid;
		grid-auto-rows: calc((40rem - 2rem) * 0.3 * 1.5 + 2rem);
		grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
		grid-gap: 2rem;
		align-items: center;
		justify-items: center;
		
		padding: 1rem;
		margin-top: 2rem;
	}
`

export default Container