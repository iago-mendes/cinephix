import styled from 'styled-components'

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
		height: 75%;
		width: 20rem;

		display: flex;
		align-items: center;
		justify-content: space-between;

		cursor: pointer;
		transition: 0.25s;

		:hover {
			transform: scale(1.05);
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

			span.signIn {
				font-family: Ubuntu;
				font-weight: 700;
				font-size: 1.75rem;
				color: ${p => p.theme.primary};

				border: ${p => p.theme.primary} 2px solid;
				border-radius: 100rem;
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

	button.controller {
		font-size: 3rem;
		color: ${p => p.theme.primary};

		background: none;
		border: none;
		border-radius: 5rem;

		padding: 0.5rem;

		display: flex;
		align-items: center;
		justify-content: center;

		transition: background-color 0.25s, color 0.25s;

		:hover {
			background-color: ${p => p.theme.primary};
			color: ${p => p.theme.secondary};
		}
	}

	@media (max-width: 1000px) {
		position: fixed;
		z-index: 2;
		bottom: 0;
		width: 100%;

		.burger {
			width: 10rem;
		}

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

type BurgerMenuProps = {
	isOpen: boolean
}

export const BurgerMenu = styled.div<BurgerMenuProps>`
	position: fixed;
	left: ${p => (p.isOpen ? 0 : '-100vw')};
	top: 0;
	z-index: 2;

	width: 75vw;
	height: calc(100vh - 5rem);
	background-color: ${p => p.theme.secondary};
	box-shadow: 5px -5px 5px rgba(0, 0, 0, 0.5);

	overflow-y: auto;
	padding: 1rem;

	transition: left 0.25s;

	button.controller {
		margin-left: auto;
		margin-bottom: 5rem;
	}

	.links {
		flex-direction: column;
		gap: 3rem;

		a {
			font-size: 2rem;
		}
	}
`

export default Container
