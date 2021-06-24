import styled from 'styled-components'

const Container = styled.div`
	position: relative;

	.options {
		background-color: ${p => p.theme.black};
		border: ${p => p.theme.primary}40 1px solid;

		width: 20rem;
		border-radius: 0.5rem;

		direction: ltr;

		header {
			::after {
				margin-top: 0.5rem !important;
			}

			.group {
				margin-top: 0.5rem;

				h3 {
					font-family: Ubuntu;
					font-size: 1.75rem;
					color: ${p => p.theme.primary};
				}
			}
		}

		ul {
			padding: 1rem;
			list-style: none;

			li {
				font-family: Roboto;
				font-size: 1.5rem;
				color: ${p => p.theme.primary};

				width: 100%;
				height: 3rem;

				display: flex;
				align-items: center;

				cursor: pointer;
				transition: 0.25s;

				:hover {
					background-color: ${p => p.theme.gray}40;
				}
			}
		}
	}
`

export default Container
