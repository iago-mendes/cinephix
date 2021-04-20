import styled from 'styled-components'

const Container = styled.div`
	width: 100%;
	height: fit-content;

	position: fixed;
	bottom: 0;
	left: 0;
	
	z-index: 2;
	
	background-color: ${p => p.theme.background};
	box-shadow: 0px -5px 5px #000;

	display: flex;
	flex-direction: column;
	align-items: center;

	.closeContainer
	{
		width: 100%;
		padding: 5px;

		display: flex;
		justify-content: flex-end;

		button
		{
			width: 30px;
			height: 30px;
			border-radius: 15px;

			background: none;
			border: ${p => p.theme.primary} 2px solid;

			display: flex;
			align-items: center;
			justify-content: center;

			color: ${p => p.theme.primary};
			font-size: 20px;
		}
	}
`

export default Container