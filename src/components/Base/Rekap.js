import { useEffect } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { useSelector } from "react-redux";
import SearchAndPlusButton from "../Utils/SearchAndPlusButton";

export default function Rekap() {
    const users = useSelector(state => state.source.users)

    useEffect(() => {
        console.log(users[0]);
    },[users])

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
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Tempat/Tgl Lahir</th>
                        <th>Jenis Kelamin</th>
                        <th>Gol. Darah</th>
                        <th>Alamat</th>
                        <th>rtRw</th>
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
                    {users?.map((user, i) => (
                        <tr className="hover" key={user.NIK}>
                            <th>{++i}</th>
                            <td>{user.NIK}</td>
                            <td>{user.nama}</td>
                            <td>{user.tempatTanggalLahir.tempat}, {user.tempatTanggalLahir.tanggalLahir}</td>
                            <td>{user.jenisKelamin}</td>
                            <td>{user.golonganDarah}</td>
                            <td>{user.alamat.alamat}</td>
                            <td>{user.alamat.rtRw}</td>
                            <td>{user.alamat.kelurahanDesa}</td>
                            <td>{user.alamat.kecamatan}</td>
                            <td>{user.agama}</td>
                            <td>{user.statusPerkawinan}</td>
                            <td>{user.pekerjaan}</td>
                            <td>{user.kewarganegaraan}</td>
                            <td>{user.berlakuHingga}</td>
                        </tr>
                    )) || []}
                </tbody>
            </table>
        </div>
    </div>
}