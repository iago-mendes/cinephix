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

		.logo
		{
			width: 50rem;
		}
	}

	@media(max-width: 1000px)
	{
		header
		{
			flex-direction: column;
			height: 40rem;
			padding-bottom: 2rem;

			.icons
			{
				flex-direction: row;
				justify-content: space-around;

				width: 100%;

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
					margin-left: 0;
					margin-top: 5rem;
					transform: rotate(25deg);
				}

				img:nth-child(odd)
				{
					margin-right: 0;
					margin-bottom: 5rem;
					transform: rotate(-25deg);
				}
			}

			.right
			{
				img:nth-child(odd)
				{
					margin-left: 0;
					margin-top: 5rem;
					transform: rotate(25deg);
				}

				img:nth-child(even)
				{
					margin-right: 0;
					margin-bottom: 5rem;
					transform: rotate(-25deg);
				}
			}

			.logo
			{
				width: 30rem;
			}
		}
	}
`

export default Container