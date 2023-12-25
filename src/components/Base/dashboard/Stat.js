import { FaRegAddressCard } from "react-icons/fa6"
import { RiAdminLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import supabase from "../../../config/supabaseClient"
import { setAdmins, setUsers } from "../../../redux/source"
import { useCallback, useEffect, useState } from "react"

export default function Stat() {
    return (
        <div className="stats shadow stats-vertical lg:stats-horizontal">
            <TotalKtp />
            <TotalAdmin />
        </div>
    )
}

function TotalKtp() {
    const users = useSelector((state) => state.source.users)
    const [fetchError, setFetchError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchUsers = useCallback(async () => {
        setFetchError(false)
        const { data, error } = await supabase.from("users").select("*")
        if (error) return setFetchError(true)
        dispatch(setUsers(data))
    }, [dispatch])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers, users])

    return (
        <div className="stat">
            <div className="stat-figure text-primary">
                <FaRegAddressCard className="text-5xl" />
            </div>
            <div className="stat-title">Total Ktp</div>
            <div className="stat-value text-primary">
                {users && users.length}{" "}
                {fetchError && <span className="bg-error px-2">Err</span>}
            </div>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/rekap")}
            >
                Selengkapnya
            </button>
        </div>
    )
}

function TotalAdmin() {
    const admins = useSelector((state) => state.source.admins)
    const [fetchError, setFetchError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchAdmins = useCallback(async () => {
        setFetchError(false)
        const { data, error } = await supabase.from("admins").select("id, username")
        if (error) return setFetchError(true)
        dispatch(setAdmins(data))
    }, [dispatch])

    useEffect(() => {
        fetchAdmins()
    }, [fetchAdmins, admins])

    return (
        <div className="stat">
            <div className="stat-figure text-secondary">
                <RiAdminLine className="text-5xl" />
            </div>
            <div className="stat-title">Total admin</div>
            <div className="stat-value text-secondary">
                {admins && admins.length}{" "}
                {fetchError && <span className="bg-error px-2">Err</span>}
            </div>
            <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
                Kelola
            </button>
        </div>
    )
}
