import { CiSearch } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function SearchAndPlusButton({className}) {
    const navigate = useNavigate()

    return <div className={`w-full flex ${className}`}>
        <div className="btn flex justify-start items-center flex-1 rounded-s-xl rounded-e-none bg-base-100 border-none" onClick={() => navigate('/cari')}>
            <CiSearch className="text-xl"/>
            <span>Cari</span>
        </div>
        <div className="btn grid place-items-center rounded-none bg-accent hover:bg-secondary border-none rounded-e-xl rounded-s-none" onClick={() => navigate('/form')}>
            <GoPlus className="text-xl"/>
        </div>
    </div>
}