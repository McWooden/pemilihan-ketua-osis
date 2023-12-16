import { useDispatch } from "react-redux"
import { setLocalStorage } from "../../../utils"
import { setAccount } from "../../../redux/source"

export default function Dashboard() {
    const dispatch = useDispatch()
    return <div className="h-full grid place-items-center">
        <div className="mockup-browser border bg-base-300">
            <div className="mockup-browser-toolbar">
                <div className="input">https://mcwooden.com</div>
            </div>
            <div className="flex justify-center px-4 py-16 bg-base-200">Selamat datang di dashboard calon pemilihan ketua osis!</div>
        </div>
        <button className="btn" onClick={() => {
            setLocalStorage('account', {})
            dispatch(setAccount())
        }}>Logout</button>
    </div>
}