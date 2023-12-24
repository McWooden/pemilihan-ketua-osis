import { bucketUrl, formatDate } from "../../../utils";

export default function DisplayUser({data}) {
    if (!data) return null
    return <div className="flex flex-col w-full max-w-xl">
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
                </tbody>
            </table>
        </div>
    </div>
}