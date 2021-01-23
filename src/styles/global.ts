import {createGlobalStyle} from 'styled-components';
import Modal from 'react-modal'
import {StylesConfig} from 'react-select'

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

	.swal2-popup
	{
		background-color: ${p => p.theme.black} !important;
		color: ${p => p.theme.primary} !important;

		#swal2-title
		{
			font-family: Ubuntu;
			font-size: 25px;
			color: ${p => p.theme.gray};
		}

		#swal2-content
		{
			font-family: Roboto;
			font-size: 20px !important;
			color: ${p => p.theme.gray};
		}

		.swal2-actions
		{
			font-size: 15px !important;
			font-family: Ubuntu !important;
		}
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

export const selectStyles: StylesConfig<{label: string, value: string}, false> =
{
	option: (provided, state) => (
	{
		cursor: 'pointer',

		fontFamily: 'Roboto',
		fontSize: '2rem',
		padding: '1rem',

		transition: '0.1s',
		color: state.isSelected ? '#23232A' : state.isFocused ? '#FF8A00' : '#7B7B7B',
		backgroundColor: state.isSelected ? '#FF8A00' : '#23232A'
	}),

	menu: (provided, state) => (
	{
		...provided,
		fontFamily: 'Roboto',
		backgroundColor: '#23232A'
	}),

	control: (provided, state) => (
	{
		cursor: 'pointer',
		
		transition: '0.25s',

		fontFamily: 'Roboto',
		fontSize: '2rem',

		width: '100%',
		backgroundColor: '#23232A',

		borderColor: state.menuIsOpen ? '#FF8A00' : state.isFocused ? '#FF8A0080' : '#7B7B7B',
		borderWidth: 2,
		borderStyle: 'solid',
		borderRadius: 5,

		display: 'flex',
		alignItems: 'center',
	}),

	singleValue: (provided, state) => (
	{
		...provided,

		color: '#FF8A00'
	}),

	indicatorSeparator: (provided, state) => (
	{
		...provided,

		backgroundColor: state.isFocused ? '#FF8A00' : '#7B7B7B'
	}),

	dropdownIndicator: (provided, state) => (
	{
		...provided,

		color: state.isFocused ? '#FF8A00' : '#7B7B7B'
	})
}