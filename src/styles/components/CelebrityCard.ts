import styled from 'styled-components'

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: ${p => p.theme.orange};
	height: calc((40rem - 2rem) * 0.3 * 1.5 + 2rem);
	width: 40rem;
	padding: 1rem;

	border-radius: 1rem;
	box-shadow: 5px 5px 5px rgba(0,0,0,0.5);

	.img
	{
		width: 30%;

		img
		{
			border-radius: 1rem;
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

		color: ${p => p.theme.black};

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

				color: ${p => p.theme.black};

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
`

export default Container