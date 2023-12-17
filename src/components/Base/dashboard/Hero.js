import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate()
    return <div className="hero bg-base-200 rounded-lg py-4">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">Selamat datang!</h1>
                <p className="py-6">Apa kabar, apa yang ingin kau lakukan hari ini?</p>
                <div className="w-full max-w-md flex">
                    <div className="btn flex justify-start items-center flex-1 rounded-s-xl rounded-e-none bg-base-100 border-none" onClick={() => navigate('/cari')}>
                        <CiSearch className="text-xl"/>
                        <span>Cari</span>
                    </div>
                    <div className="btn grid place-items-center rounded-none bg-accent hover:bg-secondary border-none rounded-e-xl rounded-s-none" onClick={() => navigate('/form')}>
                        <GoPlus className="text-xl"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}