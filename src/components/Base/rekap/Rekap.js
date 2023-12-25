import { useCallback, useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SearchAndPlusButton from "../../Utils/SearchAndPlusButton";
import supabase from "../../../config/supabaseClient";
import { setUsers } from "../../../redux/source";
import AlertError from "../../Utils/AlertError";
import TableData from "./TableData";
import { HiRefresh } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Rekap() {
    const [isLoading, setIsLoading] = useState(false)
    const users = useSelector(state => state.source.users)
    const [fetchError, setFetchError] = useState(false)
    const dispatch = useDispatch()

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setFetchError(false)
        const {data, error} = await supabase.from('users').select('*')
        if (error) {
            setFetchError(true)
            setIsLoading(false)
            return
        }
        if (data) {
            dispatch(setUsers(data))
            setIsLoading(false)
        }
    },[dispatch])

    useEffect(() => {
        fetchUsers()
    },[fetchUsers])

    return  <div className="flex flex-col h-full gap-2">
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <FaRegAddressCard className="text-5xl"/>
                </div>
                <div className="stat-title">Total Ktp</div>
                <div className="stat-value text-primary">
                    {users && users.length}
                    {fetchError && <span className="bg-error px-2">Err</span>}
                </div>
                <div className="stat-desc">
                    <button className="btn btn-outline btn-primary flex items-center gap-2" onClick={fetchUsers}>
                        {isLoading ? <AiOutlineLoading3Quarters className='text-2xl animate-spin'/> : <HiRefresh className='text-2xl'/>}
                        Segarkan
                    </button>
                </div>
            </div>
        </div>
        <SearchAndPlusButton/>
        {fetchError && <AlertError text="Kesalahan!, gagal mendapatkan data, klik untuk menyegarkan" className="btn bg-error justify-start h-auto" cb={fetchUsers}/>}
        <TableData users={users} className={'flex-1'}/>
    </div>
}