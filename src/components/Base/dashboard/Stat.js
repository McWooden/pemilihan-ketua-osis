import { FaRegAddressCard } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";

export default function Stat() {
    return <div className="stats shadow stats-vertical lg:stats-horizontal">
        <div className="stat">
            <div className="stat-figure text-primary">
                <FaRegAddressCard className="text-5xl"/>
            </div>
            <div className="stat-title">Total Ktp</div>
            <div className="stat-value text-primary">25.6K</div>
            <button className="btn btn-primary">Selengkapnya</button>
        </div>
        
        <div className="stat">
            <div className="stat-figure text-secondary">
                <RiAdminLine className="text-5xl"/>
            </div>
            <div className="stat-title">Total admin</div>
            <div className="stat-value text-secondary">2.6M</div>
            <button className="btn btn-secondary">Kelola</button>
        </div>
    </div>
}