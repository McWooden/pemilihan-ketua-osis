import { FaRegAddressCard } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Stat() {
    const users = useSelector(state => state.source.users)
    const navigate = useNavigate()
    return <div className="stats shadow stats-vertical lg:stats-horizontal">
        <div className="stat">
            <div className="stat-figure text-primary">
                <FaRegAddressCard className="text-5xl"/>
            </div>
            <div className="stat-title">Total Ktp</div>
            <div className="stat-value text-primary">{users && users.length}</div>
            <button className="btn btn-primary" onClick={() => navigate('/rekap')}>Selengkapnya</button>
        </div>
        
        <div className="stat">
            <div className="stat-figure text-secondary">
                <RiAdminLine className="text-5xl"/>
            </div>
            <div className="stat-title">Total admin</div>
            <div className="stat-value text-secondary">2.6M</div>
            <button className="btn btn-secondary" onClick={() => navigate('/admin')}>Kelola</button>
        </div>
    </div>
}