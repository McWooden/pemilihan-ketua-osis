import { useCallback, useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SearchAndPlusButton from "../Utils/SearchAndPlusButton";
import supabase from "../../config/supabaseClient";
import { setUsers } from "../../redux/source";
import ErrorAlert from "../Utils/ErrorAlert";
import { formatDate } from "../../utils";

export default function Rekap() {
    const users = useSelector(state => state.source.users)
    const [fetchError, setFetchError] = useState(false)
    const dispatch = useDispatch()

    const fetchUsers = useCallback(async () => {
        setFetchError(false)
        const {data, error} = await supabase.from('users').select('*')
        if (error) return setFetchError(true)
        dispatch(setUsers(data))
    },[dispatch])

    useEffect(() => {
        if (!users) fetchUsers()
    },[fetchUsers, users])

    return  <div className="flex flex-col h-full gap-2">
        <div className="stats shadow w-full">
            <div className="stat w-full">
                <div className="stat-figure text-primary">
                    <FaRegAddressCard className="text-5xl"/>
                </div>
                <div className="stat-title">Total Ktp</div>
                <div className="stat-value text-primary">{users && users.length}</div>
            </div>
        </div>
        <SearchAndPlusButton/>
        <div className="overflow-x-auto flex-1">
        {fetchError && <ErrorAlert text="Kesalahan!, gagal mendapatkan data, klik untuk menyegarkan" className="btn bg-error justify-start h-auto" cb={fetchUsers}/>}
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Tempat/Tgl Lahir</th>
                        <th>Jenis Kelamin</th>
                        <th>Gol. Darah</th>
                        <th>Alamat</th>
                        <th>rt</th>
                        <th>rw</th>
                        <th>Kelurahan/Desa</th>
                        <th>Kecamatan</th>
                        <th>Agama</th>
                        <th>Status Perkawinan</th>
                        <th>Pekerjaan</th>
                        <th>Kewarganegaraan</th>
                        <th>Berlaku Hingga</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr className="hover" key={user.nik}>
                            <th>{user.id}</th>
                            <td>{user.nik}</td>
                            <td>{user.nama}</td>
                            <td>{user.tempatLahir}, {formatDate(user.tanggalLahir)}</td>
                            <td>{user.jenisKelamin}</td>
                            <td>{user.golonganDarah}</td>
                            <td>{user.alamat}</td>
                            <td>{user.rt}</td>
                            <td>{user.rw}</td>
                            <td>{user.kelurahanDesa}</td>
                            <td>{user.kecamatan}</td>
                            <td>{user.agama}</td>
                            <td>{user.statusPerkawinan}</td>
                            <td>{user.pekerjaan}</td>
                            <td>{user.kewarganegaraan}</td>
                            <td>{formatDate(user.berlakuHingga)}</td>
                        </tr>
                    )) || []}
                </tbody>
            </table>
        </div>
    </div>
}