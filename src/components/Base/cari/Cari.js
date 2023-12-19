import { CiSearch } from "react-icons/ci";
import { useState } from "react"
import ErrorAlert from "../../Utils/ErrorAlert";
import supabase from "../../../config/supabaseClient";

export default function Cari() {
    const [searchKey, setSearchKey] = useState('')
    const [fetchError, setFetchError] = useState('')
    const [users, setUsers] = useState(null)

    async function handleSearch(e) {
        e.preventDefault()
        setFetchError('')
        const { data, error } = await supabase.from("users").select("*").eq('nik', searchKey)
        if (error) return setFetchError(error.message)
        setUsers(data)
    }

    return <form className="h-full flex flex-col gap-2" onSubmit={handleSearch}>
        <div className="border flex rounded-xl overflow-hidden focus:ring-sky-500 focus:ring-1">
            <input type="number" placeholder="Ketik NIK disini" className="input w-full border-none " value={searchKey} onChange={x => setSearchKey(x.target.value)} min={0}/>
            <button type="submit" className="btn grid place-items-center rounded-none border-none rounded-e-xl rounded-s-none">
                <CiSearch className="text-xl"/>
            </button>
        </div>
        {fetchError && <ErrorAlert text={fetchError}/>}
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>NIK</th>
                    <th>Nama</th>
                    <th>Jenis Kelamin</th>
                </tr>
            </thead>
            <tbody>
                {users?.map(user => (
                    <tr className="hover" key={user.nik}>
                        <th>{user.id}</th>
                        <td>{user.nik}</td>
                        <td>{user.nama}</td>
                        <td>{user.jenisKelamin}</td>
                    </tr>
                )) || []}
            </tbody>
        </table>
        {(users?.length === 0 && searchKey !== '') && <span>Tidak ada NIK yang cocok</span>}
    </form>
}