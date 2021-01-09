import {createGlobalStyle} from "styled-components";

export default createGlobalStyle`
	:root
	{
		font-size: 10px;
	}

	*
	{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}

	body
	{
		background-color: ${p => p.theme.black};

		::-webkit-scrollbar
		{
			width: 1rem;
		}

		::-webkit-scrollbar-track
		{
			background-color: ${p => p.theme.orange}26;
		}
		
		::-webkit-scrollbar-thumb
		{
			background-color: ${p => p.theme.orange};

			:hover
			{
				background-color: ${p => p.theme.orange}bf;
			}
		}
	}

	#__next
	{
		
	}
`