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
				width: 30rem;
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
						width: calc(30rem - 2rem);
						height: 10rem;

						background-color: ${p => p.theme.primary};
						border-radius: 1rem;
					}
				}
			}
		}
	}
`

export default Container