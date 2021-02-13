import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.primary};
	height: calc((40rem - 2rem) * 0.3 * 1.5 + 2rem);
	width: 40rem;
	padding: 1rem;

	border-radius: 1rem;
	box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

	text-decoration: none;

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
			border-radius: 1rem;
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

		h1
		{
			font-family: Ubuntu;
			font-weight: 700;

			font-size: 2.5rem;
			height: 17.5%;
			
			overflow: hidden;
		}

		h3
		{
			font-family: Ubuntu;
			font-weight: 400;

			font-size: 1.5rem;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		.media
		{
			display: flex;
			align-items: center;
			justify-content: space-between;

			width: 23rem;
			padding: 0.5rem;
			height: calc((23rem - 1rem) * 0.3 * 1.5 + 1rem);
			background-color: rgba(0,0,0,0.25);

			border-radius: 1rem;

			.mediaImg
			{
				width: 30%;

				img
				{
					border-radius: 1rem;
				}
			}

			.mediaInfo
			{
				width: 65%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;

				color: ${p => p.theme.background};

				padding-top: 1rem;
				padding-bottom: 1rem;

				h1
				{
					font-family: Ubuntu;
					font-weight: 700;

					font-size: 1.75rem;
					height: fit-content;
				}

				h3
				{
					font-family: Ubuntu;
					font-weight: 400;

					font-size: 1rem;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 0.5rem;
				}
			}
		}

	}

	@media(max-width: 600px)
	{
		width: 30rem;
		height: calc((30rem - 2rem) * 0.3 * 1.5 + 2rem);

		font-size: 5px;

		.info
		{
			h1
			{
				font-size: 1.75rem;
			}

			.media
			{
				width: 16rem;
				height: calc((16rem - 1rem) * 0.3 * 1.5 + 1rem);

				.mediaInfo h1
				{
					font-size: 1.25rem;
				}
			}
		}
	}
`

export default Container