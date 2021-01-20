import {createGlobalStyle} from "styled-components";
import Modal from 'react-modal'

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
		background-color: ${p => p.theme.background};

		::-webkit-scrollbar
		{
			width: 1rem;
		}

		::-webkit-scrollbar-track
		{
			background-color: ${p => p.theme.primary}26;
		}
		
		::-webkit-scrollbar-thumb
		{
			background-color: ${p => p.theme.primary};

			:hover
			{
				background-color: ${p => p.theme.primary}bf;
			}
		}
	}

	#__next
	{
		
	}
`

export const modalStyle: Modal.Styles =
{
	overlay:
	{
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		zIndex: 2
	},

	content:
	{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'none',
		border: 'none',
		padding: 0,
		width: '100%',
		height: '100%',
		left: 0,
		top: 0
	}
}