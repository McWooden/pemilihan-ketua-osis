import { useState } from "react"
import { formatDate } from "../../../utils"
import DisplayUser from "../cari/DisplayUser"

export default function TableData({users, className}) {
    const [detailUser, setDetailUser] = useState(null)

    function handleDetailUser(data) {
        setDetailUser(data)
        document.getElementById('modalToDisplayUser').showModal()
    }

    return <div className={`overflow-x-auto ${className}`}>
        <table className='table'>
            <thead>
                <tr>
                    <th>id</th>
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
                    <tr className="hover" key={user?.id} onClick={() => handleDetailUser(user)}>
                        <th>{user?.id}</th>
                        <td>{user?.nik}</td>
                        <td>{user?.nama}</td>
                        <td>{user?.tempatLahir}, {formatDate(user?.tanggalLahir)}</td>
                        <td>{user?.jenisKelamin}</td>
                        <td>{user?.golonganDarah}</td>
                        <td>{user?.alamat}</td>
                        <td>{user?.rt}</td>
                        <td>{user?.rw}</td>
                        <td>{user?.kelurahanDesa}</td>
                        <td>{user?.kecamatan}</td>
                        <td>{user?.agama}</td>
                        <td>{user?.statusPerkawinan}</td>
                        <td>{user?.pekerjaan}</td>
                        <td>{user?.kewarganegaraan}</td>
                        <td>{formatDate(user?.berlakuHingga)}</td>
                    </tr>
                )) || []}
            </tbody>
        </table>
        <dialog id={'modalToDisplayUser'} className="modal">
            <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center">
                <DisplayUser data={detailUser}/>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Tutup</button>
            </form>
        </dialog>
    </div>
}