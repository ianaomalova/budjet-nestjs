import { useState, type FC } from 'react'

const Auth: FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false)
	return (
		<div className='mt-40 flex items-center justify-center bg-slate-900'>
			<h1 className='text-center text-xl mb-10'>
				{isLogin ? 'Login' : 'Registration'}
			</h1>
		</div>
	)
}
export default Auth
