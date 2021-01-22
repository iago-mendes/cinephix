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
			height: 75%;
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
	width: 100%;
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