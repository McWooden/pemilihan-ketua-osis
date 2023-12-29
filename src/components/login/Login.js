// import { setLocalStorage } from "../../utils"
// import { setAccount } from "../../redux/source"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import supabase from '../../config/supabaseClient'

export default function Login() {
    // const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showTextError, setShowTextError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleSupabaseLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) console.log(error)
        if (data) {
            navigate('/')
        }
        if (data || error) {
            setIsLoading(false)
        }
        console.log(data)
    }
    // async function LoginToMyAccount(e) {
    //     e.preventDefault()
    //     console.log('submit');
    //     setIsLoading(true)
    //     try {
    //         let { data, error } = await supabase
    //         .from('admins')
    //         .select('username, password')
    //         .eq('username', username)
    //         .eq('password', password)
    //         if (error) {
    //             setIsLoading(false)
    //             return setShowTextError(error.message)
    //         } 
            
    //         if (!data.length) {
    //             setShowTextError('Nama pengguna atau Kata sandi salah.')
    //             setIsLoading(false)
    //             return
    //         }
            
    //         setLocalStorage('account', data[0])
    //         dispatch(setAccount())
    //         navigate('/')
    //         setIsLoading(false)
    //     } catch (error) {
    //         setIsLoading(false)
    //     }
    // }

    function handleChange() {
        setShowTextError(false)
    }

    return <div className="h-screen grid place-content-center bg-primary p-2">
        <form className="card flex flex-col gap-2 bg-base-100 card-body w-80 max-w-full" onSubmit={handleSupabaseLogin}>
            {showTextError &&
                <div role="alert" className="alert alert-error max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {/* <span>Error! Nama pengguna atau sandi salah.</span> */}
                    <span>Error! Email atau sandi salah.</span>
                </div>
            }
            {/* <label className="form-control w-64">
                <div className="label">
                    <span className="label-text">Nama pengguna</span>
                </div>
                <input type="text" placeholder="Ketik disini" className="input input-bordered w-full" onChange={(x) => {
                    setUsername(x.target.value)
                    handleChange()
                }}/>
            </label> */}
            <label className="form-control w-64">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input type="text" placeholder="Ketik disini" className="input input-bordered w-full" onChange={(x) => {
                    setEmail(x.target.value)
                    handleChange()
                }}/>
            </label>
            <label className="form-control w-64">
                <div className="label">
                    <span className="label-text">Kata kunci</span>
                </div>
                <input type="password" placeholder="Ketik disini" className="input input-bordered w-full" onChange={(x) => {
                    setPassword(x.target.value)
                    handleChange()
                }}/>
            </label>
            <button type="submit" className="btn btn-accent">{isLoading ? <span className="loading loading-spinner loading-xs"></span> :'Login'}</button>
        </form>
        {/* <button className="btn btn-accent" onClick={handleSupabaseLogin}>Check</button> */}
    </div>
}