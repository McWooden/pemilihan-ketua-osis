import { FaExternalLinkAlt } from "react-icons/fa";
import { bucketUrl, formatDate } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";

export default function DisplayUser({data}) {
    const navigate = useNavigate()
    const locate = useLocation()
    if (!data) return null
    return <div className="flex flex-col w-full max-w-xl gap-2">
        {locate.pathname !== '/cari' && <div className="flex justify-end gap-2">
                <span className="btn btn-primary" onClick={() => navigate(`/form?q=${data?.id}`)}><FaExternalLinkAlt /> Edit</span>
                <span className="btn btn-accent" onClick={() => navigate(`/cari?q=${data?.nik}`)}><FaExternalLinkAlt /> Cari detail</span>
            </div>
        }
        {data?.pathFileKtp && <>
            {data?.typeFileKtp === 'image' && <img src={bucketUrl + data?.pathFileKtp} alt="foto ktp pengguna" className="w-full shadow rounded"/>}
            {data?.typeFileKtp === 'document' && <iframe src={bucketUrl + data?.pathFileKtp} width="100%" title="user pdf" className="rounded shadow"/>}
        </>}
        <div className="w-full overflow-auto max-w-xl">
            <table className="table">
                <tbody>
                    <tr className="hover">
                        <td>NIK:</td>
                        <td>{data?.nik}</td>
                    </tr>
                    <tr className="hover">
                        <td>Nama:</td>
                        <td>{data?.nama}</td>
                    </tr>
                    <tr className="hover">
                        <td>Tempat/Tgl Lahir:</td>
                        <td>{data?.tempatLahir}, {formatDate(data?.tanggalLahir)}</td>
                    </tr>
                    <tr className="hover">
                        <td>Jenis kelamin:</td>
                        <td>{data?.jenisKelamin}</td>
                        <td>Gol. Darah:</td>
                        <td>{data?.golonganDarah}</td>
                    </tr>
                    <tr className="hover">
                        <td>Alamat:</td>
                        <td>{data?.alamat}</td>
                    </tr>
                    <tr className="hover">
                        <td className="text-center">RT/RW</td>
                        <td>{data?.rt}/{data?.rw}</td>
                    </tr>
                    <tr className="hover">
                        <td className="text-center">Kel/Desa</td>
                        <td>{data?.kelurahanDesa}</td>
                    </tr>
                    <tr className="hover">
                        <td className="text-center">Kecamatan</td>
                        <td>{data?.kecamatan}</td>
                    </tr>
                    <tr className="hover">
                        <td>Agama</td>
                        <td>{data?.agama}</td>
                    </tr>
                    <tr className="hover">
                        <td>Status perkawinan</td>
                        <td>{data?.agama}</td>
                    </tr>
                    <tr className="hover">
                        <td>Pekerjaan</td>
                        <td>{data?.pekerjaan}</td>
                    </tr>
                    <tr className="hover">
                        <td>Kewarganegaraan</td>
                        <td>{data?.kewarganegaraan}</td>
                    </tr>
                    <tr className="hover">
                        <td>Berlaku Hingga</td>
                        <td>{formatDate(data?.berlakuHingga)}</td>
                    </tr>
                    <tr className="hover">
                        <td>Path File</td>
                        <td>{data.pathFileKtp}</td>
                        <td>Tipe File</td>
                        <td>{data.typeFileKtp}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}