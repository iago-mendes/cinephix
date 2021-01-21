import styled from 'styled-components'

const Container = styled.div`
	*
	{
		::-webkit-scrollbar
		{
			height: 1rem;
			width: 1rem;
		}

		::-webkit-scrollbar-track
		{
			background-color: #242329;
			border-radius: 1rem;
		}
		
		::-webkit-scrollbar-thumb
		{
			background-color: #4d4d5a;
			border-radius: 1rem;

			:hover
			{
				background-color: #3b3b45;
			}
		}
	}

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
				width: 33rem;
				height: fit-content;

				padding-top: 1rem;
				border-top-right-radius: 0.5rem;
				border-top-left-radius: 0.5rem;

				display: flex;
				flex-direction: column;
				align-items: center;

				h1
				{
					font-family: Roboto;
					font-weight: 700;
					font-size: 2.25rem;

					color: ${p => p.theme.primary};

					width: 100%;
					text-align: center;

					::after
					{
						content: '';
						width: 100%;
						height: 1px;
						display: block;

						margin-top: 1rem;

						background: ${p => p.theme.primary}40;
					}
				}

				.scroll
				{
					width: 100%;
					max-height: calc(100vh - 17.5rem);
					overflow-y: auto;

					.droppableArea
					{
						width: 100%;
						height: fit-content;
						min-height: 10rem;
						background-color: ${p => p.theme.background}40;

						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 1rem;

						padding: 1rem;

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

							cursor: pointer;
							transition: 0.25s;

							:hover, :active
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

									word-wrap: break-word;
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
	}
`

export default Container