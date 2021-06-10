import styled from 'styled-components'

const Container = styled.div`
	height: calc(100vh - 5rem);
	padding: 2rem;

	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;

	.img
	{
		height: calc(100vh - 5rem - 4rem);
		width: calc((100vh - 5rem - 4rem) / 1.5);
		max-width: calc(50% - 5rem);

		img
		{
			border-radius: 1rem;
		}
	}

	.info
	{
		height: 100%;
		width: 50%;
		margin-right: 5rem;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		gap: 2rem;

		color: ${p => p.theme.primary};

		h1
		{
			font-family: Ubuntu;
			font-weight: 700;
			font-size: 4rem;
		}

		form
		{
			width: 100%;
			height: calc(100% - 5rem);

			display: flex;
			flex-direction: column;
			justify-content: space-between;

			label
			{
				font-family: Roboto;
				font-weight: 700;
				font-size: 2rem;

				border-left: ${p => p.theme.primary} 5px solid;
				padding-left: 1rem;
			}

			.field
			{
				width: 75%;

				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.select, .switch
				{
					margin-left: 2rem;
				}
			}

			.rangeFields
			{
				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.rating
				{
					height: 2.6rem;

					display: flex;
					align-items: center;
					gap: 1rem;

					label
					{
						font-size: 1.75rem;
						border: 0;
						padding: 0;
						margin-left: 2rem;

						width: fit-content;
						white-space: nowrap;

						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					span
					{
						font-family: Ubuntu;
						font-size: 1.75rem;
					}

					.group
					{
						display: flex;
						align-items: center;
						justify-content: space-between;

						height: 100%;
						width: 100%;

						input[type=number]
						{
							font-family: Ubuntu;
							font-size: 1.75rem;
							color: ${p => p.theme.primary};

							padding-top: 0.25rem;
							padding-bottom: 0.25rem;
							padding-left: 0.5rem;
							width: 3rem;

							background-color: ${p => p.theme.black}40;
							border: none;
							border-bottom: ${p => p.theme.gray}40 2px solid;

							-moz-appearance: textfield;

							::-webkit-outer-spin-button, ::-webkit-inner-spin-button
							{
								-webkit-appearance: none;
								margin: 0;
							}
						}

						.group2
						{
							display: flex;
							align-items: center;
							gap: 1rem;

							.clear
							{
								background: none;
								border: none;
								color: ${p => p.theme.primary};

								width: 2rem;
								height: 2rem;
								border-radius: 100rem;

								display: flex;
								align-items: center;
								justify-content: center;

								cursor: pointer;
								transition: 0.25s;

								:hover
								{
									background-color: ${p => p.theme.primary};
									color: ${p => p.theme.background};
								}
							}
						}
					}
				}
			}

			.buttons
			{
				display: flex;
				align-items: center;
				justify-content: space-around;

				button
				{
					display: flex;
					align-items: center;
					justify-content: center;

					border: none;
					background: none;

					width: 4rem;
					height: 4rem;
					border-radius: 100rem;

					cursor: pointer;
					transition: 0.25s;

					:hover
					{
						color: ${p => p.theme.background};
					}
				}

				.cancel
				{
					color: ${p => p.theme.delete};
					border: ${p => p.theme.delete} 1px solid;

					:hover
					{
						background-color: ${p => p.theme.delete}
					}
				}

				.confirm
				{
					color: ${p => p.theme.confirm};
					border: ${p => p.theme.confirm} 1px solid;

					:hover
					{
						background-color: ${p => p.theme.confirm}
					}
				}
			}
		}
	}

	@media(max-width: 1024px)
	{
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;

		height: fit-content;

		.img
		{
			height: calc(75vw * 1.5);
			width: 75vw;
			max-width: 40rem;
		}

		.info
		{
			width: 100%;
			margin: 0;

			h1
			{
				font-size: 2.5rem;
			}

			form
			{
				height: fit-content;
				gap: 3rem;

				label
				{
					font-size: 1.75rem;
				}

				.field
				{
					width: 100%;
				}

				.rangeFields .rating
				{

					flex-direction: column;
					align-items: flex-start;

					height: fit-content;
					padding-left: 2rem;

					label
					{
						margin: 0;
						font-size: 1.5rem;
					}

					span
					{
						font-size: 1.25rem;
					}

					.group
					{
						height: 2.5rem;

						input[type=number]
						{
							font-size: 1.25rem;
						}
					}
				}
			}
		}
	}

	@media(max-width: 350px)
	{
		.info form .rangeFields .rating .group
		{
			height: fit-content;

			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}
	}
`

interface RangeInputProps
{
	isUndefined: boolean
}

export const RangeInput = styled.input<RangeInputProps>`
	-webkit-appearance: none; 
	appearance: none;
	outline: none;

	background: ${p => p.isUndefined ? p.theme.black : p.theme.primary + 80};
	width: 20rem;
	height: 0.5rem;
	border-radius: 100rem;

	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;

	:hover
	{
		opacity: 1;
	}

	::-webkit-slider-thumb
	{
		-webkit-appearance: none;
		appearance: none;

		width: 2rem;
		height: 2rem;
		border-radius: 100rem;
		background: ${p => p.isUndefined ? p.theme.gray : p.theme.primary};
		cursor: pointer;
	}

	::-webkit-slider-thumb, ::-moz-range-thumb
	{
		width: 2rem;
		height: 2rem;
		border-radius: 100rem;
		background: ${p => p.isUndefined ? p.theme.gray : p.theme.primary};
		cursor: pointer;
	}
`

export default Container