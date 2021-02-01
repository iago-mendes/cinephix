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
				max-width: 7rem;
				max-height: 7rem;
			}
		}

		.left
		{
			img:nth-child(even)
			{
				margin-left: 10rem;
				transform: rotate(25deg);
			}

			img:nth-child(odd)
			{
				margin-right: 10rem;
				transform: rotate(-25deg);
			}
		}

		.right
		{
			img:nth-child(odd)
			{
				margin-left: 10rem;
				transform: rotate(25deg);
			}

			img:nth-child(even)
			{
				margin-right: 10rem;
				transform: rotate(-25deg);
			}
		}

		.logos
		{
			width: 50rem;

			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;

			.icon
			{
				width: 25%;
			}

			.name
			{
				width: 100%;
			}
		}
	}

	@media(max-width: 1000px)
	{
		header
		{
			flex-direction: column;
			height: fit-content;
			padding: 2rem;
			padding-bottom: 4rem;

			.icons
			{
				flex-direction: row;
				justify-content: space-around;

				width: 100%;

				img
				{
					max-width: 3rem;
					max-height: 3rem;
				}
			}

			.left
			{
				img:nth-child(odd)
				{
					margin: 0;
					margin-top: 1rem;
					transform: rotate(25deg);
				}

				img:nth-child(even)
				{
					margin: 0;
					margin-bottom: 1rem;
					transform: rotate(-25deg);
				}
			}

			.right
			{
				img:nth-child(odd)
				{
					margin: 0;
					margin-top: 1rem;
					transform: rotate(25deg);
				}

				img:nth-child(even)
				{
					margin: 0;
					margin-bottom: 1rem;
					transform: rotate(-25deg);
				}
			}

			.logos
			{
				width: 60vw;
				max-width: 50rem;
			}
		}
	}
`

export default Container