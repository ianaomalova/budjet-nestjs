import type { FC } from 'react'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const Header: FC = () => {
	const isAuth = false
	return (
		<header className='flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm text-base'>
			<Link to='/'>
				<FaBtc size={20} />
			</Link>
			{isAuth && (
				<nav className='ml-auto mr-10'>
					<ul className='flex items-center gap-5'>
						<li>
							<NavLink
								to={'/'}
								className={({ isActive }) =>
									isActive ? 'text-blue-500' : 'text-white'
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/categories'}
								className={({ isActive }) =>
									isActive ? 'text-blue-500' : 'text-white'
								}
							>
								Categories
							</NavLink>
						</li>
						<li>
							<NavLink
								to={'/transactions'}
								className={({ isActive }) =>
									isActive ? 'text-blue-500' : 'text-white'
								}
							>
								Transactions
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{isAuth ? (
				<button className='btn btn-red'>
					Log out
					<FaSignOutAlt />
				</button>
			) : (
				<Link className='text-white/50 hover:text-white ml-auto' to={'auth'}>
					Log in / Sign in
				</Link>
			)}
		</header>
	)
}
export default Header
