import styled from 'styled-components'

export const Container = styled.button`
	background: none;
	border: none;

	:hover svg line {
		stroke: ${p => p.theme.primary}bf;
	}

	svg {
		overflow: visible;
		line {
			stroke: ${p => p.theme.primary};
			stroke-width: 3px;
			transition: stroke 0.2s;
		}
	}
`
