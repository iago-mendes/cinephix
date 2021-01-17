import styled from 'styled-components'

const Container = styled.div`
	main
	{
		height: fit-content;
		min-height: calc(100vh - 5rem);

		overflow-x: auto;

		.dragDropArea
		{
			display: flex;
			gap: 2rem;
			padding: 2rem;

			width: fit-content;

			.statusColumn
			{
				background-color: ${p => p.theme.black};
				width: 32rem;
				height: fit-content;
				padding: 1rem;
				border-radius: 0.5rem;

				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 2rem;

				h1
				{
					font-family: Roboto;
					font-weight: 700;
					font-size: 2.25rem;

					color: ${p => p.theme.primary};
				}

				.droppableArea
				{
					width: 100%;
					height: fit-content;
					min-height: 10rem;

					display: flex;
					flex-direction: column;
					gap: 1rem;

					.tvshow
					{
						width: 30rem;
						padding: 0.5rem;
						height: calc((30rem - 1rem) * 0.4 * 1.5 + 1rem);

						background-color: ${p => p.theme.primary};
						border-radius: 1rem;

						display: flex;
						align-items: center;
						justify-content: space-between;

						cursor: move;

						.img
						{
							width: 40%;
							
							img
							{
								border-radius: 0.5rem;
							}
						}

						.info
						{
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							padding-top: 1rem;
							padding-bottom: 1rem;

							width: 50%;
							height: 100%;

							h2
							{
								font-family: Ubuntu;
								font-weight: 700;
								font-size: 2rem;

								color: ${p => p.theme.background};
							}

							.details
							{
								display: flex;
								flex-direction: column;
								gap: 1rem;

								font-family: Ubuntu;
								font-weight: 400;
								font-size: 1.5rem;

								color: ${p => p.theme.background};
							}
						}
					}
				}
			}
		}
	}
`

export default Container