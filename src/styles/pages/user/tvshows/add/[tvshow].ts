import styled from 'styled-components'

const Container = styled.div`
	height: calc(100vh - 5rem);
	padding: 2rem;

	display: flex;
	justify-content: space-between;

	.img
	{
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

			.selectField
			{
				width: 75%;

				display: flex;
				flex-direction: column;
				gap: 0.5rem;

				.select
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

						width: 100%;

						input[type=number]
						{
							font-family: Ubuntu;
							font-size: 1.75rem;
							color: ${p => p.theme.primary};

							padding-top: 0.25rem;
							padding-bottom: 0.25rem;
							padding-left: 0.5rem;
							width: 5rem;

							background-color: ${p => p.theme.black}40;
							border: none;
							border-bottom: ${p => p.theme.gray}40 2px solid;
						}
					}
				}
			}
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

	background: ${p => p.isUndefined ? p.theme.black : p.theme.primary};
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
		background: ${p => p.isUndefined ? p.theme.black : p.theme.primary};
		cursor: pointer;
	}

	::-webkit-slider-thumb, ::-moz-range-thumb
	{
		width: 2rem;
		height: 2rem;
		border-radius: 100rem;
		background: ${p => p.isUndefined ? p.theme.black : p.theme.primary};
		cursor: pointer;
	}
`

export default Container