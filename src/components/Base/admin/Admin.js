import { RiAdminLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import supabase from "../../../config/supabaseClient"
import { setAdmins } from "../../../redux/source"
import { useCallback, useEffect, useState } from "react"
import AlertError from "../../Utils/AlertError"

export default function Admin() {
    const admins = useSelector((state) => state.source.admins)
    const [fetchError, setFetchError] = useState(false)

    const dispatch = useDispatch()

    const fetchAdmins = useCallback(async () => {
        setFetchError(false)
        const { data, error } = await supabase.from("admins").select("id, username")
        
        if (error) return setFetchError(true)

        dispatch(setAdmins(data))
    }, [dispatch])

    useEffect(() => {
        if (!admins) fetchAdmins()
    }, [fetchAdmins, admins])

    return <div className="h-full flex flex-col gap-2">
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <RiAdminLine className="text-5xl" />
                </div>
                <div className="stat-title">Total admin</div>
                <div className="stat-value text-secondary">
                    {admins && admins.length}{" "}
                    {fetchError && <span className="bg-error px-2">Err</span>}
                </div>
            </div>
        </div>
        <div className="text-xs text-neutral-content">Terbatasnya pengetahuan tentang keamanan, mengelola admin hanya bisa dilakukan secara manual :(</div>
        <div className="overflow-x-auto flex-1">
        {fetchError && <AlertError text="Kesalahan!, gagal mendapatkan data, klik untuk menyegarkan" className="btn bg-error justify-start h-auto" cb={fetchAdmins}/>}
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nama pengguna</th>
                    </tr>
                </thead>
                <tbody>
                    {admins?.map(admin => (
                        <tr className="hover" key={admin.id}>
                            <th>{admin.id}</th>
                            <td>{admin.username}</td>
                        </tr>
                    )) || []}
                </tbody>
            </table>
        </div>
    </div>
}