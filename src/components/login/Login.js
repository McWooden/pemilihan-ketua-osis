import { useDispatch } from "react-redux"
import { setLocalStorage, verifyAdmin } from "../../utils"
import { setAccount } from "../../redux/source"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    function LoginToMyAccount(e) {
        e.preventDefault()
        const input = {username, password}
        if (verifyAdmin(input)) {
            setLocalStorage('account', {username, password})
            dispatch(setAccount())
            navigate('/')
            return
        }
        setShowError(true)
    }

    function handleChange() {
        setShowError(false)
    }

    return <div className="h-screen grid place-content-center bg-primary p-2">
        <form className="card flex flex-col gap-2 bg-base-100 card-body w-80 max-w-full" onSubmit={LoginToMyAccount}>
            {showError &&
                <div role="alert" className="alert alert-error max-w-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! Nama pengguna atau sandi salah.</span>
                </div>
            }
            <label className="form-control w-64">
                <div className="label">
                    <span className="label-text">Nama pengguna</span>
                </div>
                <input type="text" placeholder="Ketik disini" className="input input-bordered w-full" onChange={(x) => {
                    setUsername(x.target.value)
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
            <button type="submit" className="btn btn-accent">Login</button>
        </form>
    </div>
}