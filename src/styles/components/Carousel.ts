import styled from 'styled-components'

const Container = styled.div`
	.swiper
	{
		padding-left: 5rem;
		padding-right: 5rem;

		.swiper-slide
		{
			display: flex;
			align-items: center;
			justify-content: center;

			.card
			{
				display: flex;
				align-items: center;
				justify-content: space-between;

				background-color: ${p => p.theme.primary};
				padding: 1rem;
				width: 35rem;
				height: calc((35rem - 2rem) * 0.3 * 1.5 + 2rem);

				border-radius: 1rem;

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
					}

					h2
					{
						font-family: Ubuntu;
						font-weight: 400;

						font-size: 1.5rem;

						display: flex;
						align-items: center;
						justify-content: center;
						gap: 0.5rem;
					}
				}
			}
		}

		.swiper-button-prev, .swiper-button-next
		{
			width: 3.5rem;
			height: 6rem;
			border-radius: 100rem;

			color: ${p => p.theme.primary};
			transition: 0.25s;

			:hover
			{
				color: ${p => p.theme.background};
				background-color: ${p => p.theme.primary};

				box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
			}
		}
	}
`

export default Container