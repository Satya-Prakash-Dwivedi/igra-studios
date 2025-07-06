import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <form className='form h-screen w-screen items-center justify-center flex flex-col'>
            <div className='email p-5'>
                <label htmlFor="email">Email: </label>
                <input className='border-1' id="email" name="email" type="email" required />
            </div>
            <div className='password p-5'>
                <label htmlFor="password">Password: </label>
                <input className='border-1' id="password" name="password" type="password" required />
            </div>
            <div className='button p-5 flex gap-2'>
                <button className='border-1 p-2 rounded-md' formAction={login}>Sign In</button>
                <button className='border-1 p-2 rounded-md' formAction={signup}>Sign Up</button>
            </div>
        </form>
    )
}