import { CiSearch } from "react-icons/ci";
import { useState } from "react"
import supabase from "../../../config/supabaseClient";
import Alert from "../../Utils/Alert";
import AlertError from "../../Utils/AlertError";

export default function Cari() {
    const [searchKey, setSearchKey] = useState('')
    const [fetchError, setFetchError] = useState('')
    const [users, setUsers] = useState(null)
    const [fetchEmpety, setFetchEmpety] = useState(false)

    async function handleSearch(e) {
        e.preventDefault()
        setFetchError('')
        setFetchEmpety(false)
        const { data, error } = await supabase.from("users").select("*").eq('nik', searchKey)
        if (error) return setFetchError(error.message)

        if (!data.length) setFetchEmpety(true)

        setUsers(data)
    }

    return <form className="h-full flex flex-col gap-2" onSubmit={handleSearch}>
        <div className="border flex rounded-xl overflow-hidden focus:ring-sky-500 focus:ring-1">
            <input type="number" placeholder="Ketik NIK disini" className="input w-full border-none " value={searchKey} onChange={x => {
                setSearchKey(x.target.value)
                setFetchEmpety(false)
            }} min={0} autoFocus/>
            <button type="submit" className="btn grid place-items-center rounded-none border-none rounded-e-xl rounded-s-none">
                <CiSearch className="text-xl"/>
            </button>
        </div>
        {fetchError && <AlertError text={fetchError}/>}
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
        {(fetchEmpety && searchKey !== '') && <Alert text={`Tidak ada NIK yang cocok dengan ${searchKey}.`} className="btn justify-start h-auto" cb={() => setFetchEmpety(false)}/>}
    </form>
}


