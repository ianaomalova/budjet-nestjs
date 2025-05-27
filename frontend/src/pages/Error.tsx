import type { FC } from 'react'
import img from '../assets/404-error-with-landscape-concept-illustration_114360-7898.avif'
import { Link } from 'react-router-dom'

const Error: FC = () => {
	return (
		<div className='min-h-screen bg-slate-900 flex justify-center items-center flex-col gap-10'>
			<Link
				to={'/'}
				className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'
			>
				Back
			</Link>
			<img src={img} alt='' />
		</div>
	)
}
export default Error
