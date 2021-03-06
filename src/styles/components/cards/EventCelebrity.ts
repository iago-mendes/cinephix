import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.primary};
	padding: 0.5rem;
	width: 25rem;
	height: calc((25rem - 1rem) * 0.3 * 1.5 + 1rem);

	border-radius: 0.5rem;
	box-shadow: 5px 5px 5px rgba(0,0,0,0.5);
	
	text-decoration: none;
	position: relative;

	cursor: pointer;
	transition: 0.25s;

	:hover
	{
		border-radius: 0;
		background-color: ${p => p.theme.primary}bf;

		.img img
		{
			border-radius: 0;
		}
	}

	.img
	{
		width: 30%;

		img
		{
			border-radius: 0.5rem;
			transition: 0.25s;
		}
	}

	.info
	{
		width: 65%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;

		color: ${p => p.theme.background};
		overflow: hidden;

		.name
		{
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 1.5rem;
		}

		.media
		{
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 15rem;
			padding: 0.25rem;
			height: calc((10rem - 1rem) * 0.3 * 1.5 + 1rem);
			background-color: rgba(0,0,0,0.25);

			border-radius: 0.25rem;

			.mediaImg
			{
				width: 20%;

				img
				{
					border-radius: 0.25rem;
				}
			}

			.mediaInfo
			{
				width: 75%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;

				color: ${p => p.theme.background};
				overflow: hidden;

				.title
				{
					font-family: Ubuntu;
					font-weight: 700;

					font-size: 1.25rem;
				}

				.date
				{
					font-family: Ubuntu;
					font-size: 1.25rem;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
				}
			}
		}
	}

	@media(min-width: 600px)
	{
		padding: 1rem;
		width: 35rem;
		height: calc((35rem - 2rem) * 0.3 * 1.5 + 2rem);

		.info
		{
			.name
			{
				font-size: 2rem;
			}

			.media
			{
				width: 20rem;
				padding: 0.5rem;
				height: calc((15rem - 1rem) * 0.3 * 1.5 + 1rem);

				.mediaInfo
				{
					.title
					{
						font-size: 1.75rem;
					}

					.date
					{
						font-size: 1.5rem;
					}
				}
			}
		}
	}
`

export default Container