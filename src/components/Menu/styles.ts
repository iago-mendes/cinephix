import styled from 'styled-components'
import {motion} from 'framer-motion'

type ContainerProps = {
	isUserMenuOpen: boolean
}

const Container = styled.nav<ContainerProps>`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0.5rem;
	padding-left: 2rem;
	padding-right: 2rem;

	height: 5rem;
	background-color: ${p => p.theme.secondary};

	.logos {
		z-index: 101;

		height: 75%;
		width: 20rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;
		transition: transform 0.2s;

		:hover {
			transform: scale(0.9);
		}

		.icon {
			width: 20%;
		}

		.name {
			width: 75%;
		}
	}

	.links {
		display: flex;
		align-items: center;
		gap: 2rem;

		a {
			text-decoration: none;
			font-family: Ubuntu;
			font-weight: 700;
			font-size: 1.75rem;

			color: ${p => p.theme.primary};
			display: inline-block;

			::after {
				content: '';
				width: 0px;
				height: 2px;
				display: block;
				background: ${p => p.theme.primary};
				transition: 0.25s;
			}

			:hover::after {
				width: 100%;
			}
		}
	}

	.container {
		display: flex;
		align-items: center;
		gap: 5rem;

		.user {
			position: relative;

			button.signIn {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;
				color: ${p => p.theme.primary};
				background: none;

				border: ${p => p.theme.primary} 2px solid;
				border-radius: 0.5rem;
				padding: 0.5rem;
				padding-left: 1rem;
				padding-right: 1rem;

				cursor: pointer;
				transition: 0.25s;

				:hover {
					background-color: ${p => p.theme.primary};
					color: ${p => p.theme.secondary};
				}
			}

			button.dropdown {
				display: flex;
				align-items: center;
				gap: 1rem;

				height: 3.5rem;

				border: none;
				border-radius: 100rem;
				background: none;
				color: ${p => p.theme.primary};

				cursor: pointer;
				transition: 0.25s;

				:hover {
					transform: scale(1.07);
				}

				.img {
					max-width: 100%;
					max-height: 100%;
					border-radius: 100rem;
				}

				.indicator {
					transition: 0.25s;

					transform: ${p =>
						p.isUserMenuOpen ? 'rotate(-180deg)' : 'rotate(-90deg)'};
				}
			}
		}
	}

	@media (max-width: 1000px) {
		position: fixed;
		z-index: 2;
		bottom: 0;
		width: 100%;

		.logos {
			width: 6rem;
			position: relative;
			justify-content: center;

			.icon {
				width: 6rem;
				height: 6rem;

				position: absolute;
				bottom: 0;
			}
		}

		.container {
			width: 10rem;

			.user {
				margin-left: auto;

				button.dropdown .indicator {
					transform: ${p =>
						p.isUserMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
				}
			}
		}
	}
`

export const BurgerMenu = styled(motion.aside)`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	z-index: 100;

	background-color: ${p => p.theme.secondary};
	box-shadow: 5px -5px 5px rgba(0, 0, 0, 0.5);

	overflow-x: hidden;
	overflow-y: auto;

	display: flex;
	align-items: center;
	justify-content: center;

	.links {
		flex-direction: column;
		gap: 3rem;

		a {
			font-size: 2rem;
		}
	}
`

export default Container
