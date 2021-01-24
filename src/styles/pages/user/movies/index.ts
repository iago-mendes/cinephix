import styled from 'styled-components'

const Container = styled.div`
	main
	{
		height: fit-content;
		min-height: calc(100vh - 5rem);

		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 2rem;

		.watchList, .watched
		{
			width: 100%;

			.grid
			{
				width: 100%;

				display: grid;
				grid-auto-rows: calc((30rem - 1rem) * 0.4 * 1.5 + 1rem);
				grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
				grid-gap: 2rem;
				align-items: center;
				justify-items: center;

				.movie
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

		.watchList
		{
			background-color: ${p => p.theme.black}40;
			padding: 1rem;
			border-radius: 1rem;

			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
	}
`

interface DropdownProps
{
	showWatchList: boolean
}

export const Dropdown = styled.div<DropdownProps>`
	width: fit-content;

	display: flex;
	align-items: center;
	gap: 1rem;

	color: ${p => p.theme.primary};

	cursor: pointer;
	transition: 0.25s;

	:hover
	{
		transform: scale(1.05);
	}

	span
	{
		font-family: Roboto;
		font-weight: 700;
		font-size: 2.5rem;
	}

	svg
	{
		transition: 0.25s;
		transform: ${p => p.showWatchList ? 'rotate(180deg)' : 'rotate(90deg)'};
	}
`

export default Container