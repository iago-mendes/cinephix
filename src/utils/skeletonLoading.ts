import styled from 'styled-components'

type SkeletonLoadingProps = {
	height?: number | string
	width?: number | string
	opacity?: number | string

	avoidAnimation?: boolean
}

export const SkeletonLoading = styled.div<SkeletonLoadingProps>`
	display: inline-block;
	position: relative;
	overflow: hidden;
	background-color: ${p => p.theme.black};
	height: ${p => (p.height ? p.height : '100%')};
	width: ${p => (p.width ? p.width : '100%')};
	border-radius: 0.5rem;
	opacity: ${p => (p.opacity ? p.opacity : 1)};

	::before {
		content: '';
		display: block;
		position: absolute;
		left: -150px;
		top: 0;
		height: 100%;
		width: 150px;
		background: ${p =>
			`linear-gradient(to right, transparent 0%, ${p.theme.textBlack} 50%, transparent 100%)`};

		animation: ${p =>
			!p.avoidAnimation && 'load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite'};
	}

	@keyframes load {
		from {
			left: -150px;
		}
		to {
			left: 100%;
		}
	}
`
