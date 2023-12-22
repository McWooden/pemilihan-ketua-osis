import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import supabase from "../../../config/supabaseClient"
import AlertError from "../../Utils/AlertError"

// preveew state
// next finish this
export default function Form() {
    const [nik, setNik] = useState(' ')
    const [nama, setNama] = useState('')
    const [tempatLahir, setTempatLahir] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('-')
    const [golonganDarah, setGolonganDarah] = useState('-')
    const [alamat, setAlamat] = useState('')
    const [rt, setRt] = useState('')
    const [rw, setRw] = useState('')
    const [kelurahanDesa, setKelurahanDesa] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [agama, setAgama] = useState('-')
    const [statusPerkawinan, setStatusPerkawinan] = useState('-')
    const [pekerjaan, setPekerjaan] = useState('')
    const [kewarganegaraan, setKewarganegaraan] = useState('-')
    const [file, setFile] = useState([])

    const [isloading, setIsLoading] = useState(false)
    const [errorFileUpload, setErrorFileUpload] = useState(false)
    const [errorInsertRow, setErrorInsertRow] = useState(false)

    const onDrop = useCallback(acceptFiles => {
        console.log(acceptFiles && acceptFiles[0]);
        setFile(acceptFiles[0] && acceptFiles[0])
    }, [])

    const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf']
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        setErrorFileUpload(false)
        setErrorInsertRow(false)
        let dataToSend = {
            nik, nama,
            tempatLahir, tanggalLahir,
            jenisKelamin, golonganDarah,
            alamat, rt, rw, kelurahanDesa, kecamatan,
            agama, statusPerkawinan, pekerjaan, kewarganegaraan,
            pathFileKtp: nik, typeFileKtp: 'image'
        }
        console.log('FILE', file)
        try {
            const {data, error} = await supabase.storage.from('fotoKtp').upload(nik, file)
            console.log('error upload', error);
            if (error) throw new Error(error)
            dataToSend.pathFileKtp = data.path
            setFile(null)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setErrorFileUpload(true)
            setIsLoading(false)
        }
    }

    return <form className="flex flex-col h-full gap-2 items-center py-4" onSubmit={handleSubmit}>
        {errorFileUpload && <AlertError text="Error saat mengunggah file"/>}
        {errorInsertRow && <AlertError text="Error saat menambahkan data"/>}
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Nomor Induk Kependudukan</span>
            </div>
            <input
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                type="number"
                placeholder="Ketik 16 digit disini"
                className="input input-bordered w-full"
                // max={16} min={16}
                required
            />
        </label>
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Nama</span>
            </div>
            <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                type="text"
                placeholder="Ketik disini"
                className="input input-bordered w-full"
            />
        </label>
        <div className="flex gap-2 max-w-lg w-full max-w-lg sm:flex-row flex-col">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Tempat Lahir</span>
                </div>
                <input
                    value={tempatLahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    type="text"
                    placeholder="Ketik disini"
                    className="input input-bordered w-full"
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Tanggal Lahir</span>
                </div>
                <input
                    value={tanggalLahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    type="date"
                    className="input input-bordered w-full"
                />
            </label>
        </div>
        <div className="flex gap-2 max-w-lg w-full max-w-lg sm:flex-row flex-col">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Jenis Kelamin</span>
                </div>
                <select className="select select-bordered" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                    <option disabled value='-'>Pilih satu</option>
                    <option value='Laki-laki'>Laki-laki</option>
                    <option value='Perempuan'>Perempuan</option>
                </select>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Gol Darah</span>
                </div>
                <select className="select select-bordered" value={golonganDarah} onChange={(e) => setGolonganDarah(e.target.value)}>
                    <option disabled value='-'>Pilih satu</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='AB'>AB</option>
                    <option value='O'>O</option>
                </select>
            </label>
        </div>
        <div className="flex gap-2 max-w-lg w-full max-w-lg sm:flex-row flex-col">
            <label className="form-control w-full flex-1">
                <div className="label">
                    <span className="label-text">Alamat</span>
                </div>
                <input
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    type="text"
                    placeholder="Ketik disini"
                    className="input input-bordered w-full"
                />
            </label>
            <div className="flex gap-2 max-w-lg flex-1">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">RT</span>
                    </div>
                    <input
                        value={rt}
                        onChange={(e) => setRt(e.target.value)}
                        type="number"
                        placeholder="Ketik disini"
                        className="input input-bordered w-full"
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">RW</span>
                    </div>
                    <input
                        value={rw}
                        onChange={(e) => setRw(e.target.value)}
                        type="number"
                        placeholder="Ketik disini"
                        className="input input-bordered w-full"
                    />
                </label>
            </div>
        </div>
        <div className="flex gap-2 max-w-lg w-full max-w-lg sm:flex-row flex-col">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Kel/Desa</span>
                </div>
                <input
                    value={kelurahanDesa}
                    onChange={(e) => setKelurahanDesa(e.target.value)}
                    type="text"
                    placeholder="Ketik disini"
                    className="input input-bordered w-full"
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Kecamatan</span>
                </div>
                <input
                    value={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)}
                    type="text"
                    placeholder="Ketik disini"
                    className="input input-bordered w-full"
                />
            </label>
        </div>
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Agama</span>
            </div>
            <select className="select select-bordered" value={agama} onChange={(e) => setAgama(e.target.value)}>
                <option disabled value='-'>Pilih satu</option>
                <option value='Islam<'>Islam</option>
                <option value='Kristen'>Kristen</option>
                <option value='Katolik'>Katolik</option>
                <option value='Hindu<'>Hindu</option>
                <option value='Buddha'>Buddha</option>
                <option value='Khonghucu'>Khonghucu</option>
            </select>
        </label>
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Status perkawinan</span>
            </div>
            <select className="select select-bordered" value={statusPerkawinan} onChange={(e) => setStatusPerkawinan(e.target.value)}>
                <option disabled value='-'>Pilih satu</option>
                <option value='Islam<'>Belum Kawin</option>
                <option value='Kristen'>Kawin</option>
            </select>
        </label>
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Pekerjaan</span>
            </div>
            <input
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                type="text"
                placeholder="Ketik disini"
                className="input input-bordered w-full"
            />
        </label>
        <label className="form-control w-full max-w-lg">
            <div className="label">
                <span className="label-text">Kewarganegaraan</span>
            </div>
            <select className="select select-bordered" value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)}>
                <option disabled value='-'>Pilih satu</option>
                <option value='Islam<'>WNI</option>
                <option value='Kristen'>WNA</option>
                <option value='Katolik'>ITAP</option>
            </select>
        </label>
        <div className="w-full max-w-lg relative" {...getRootProps()}>
            <div className="label">
                <span className="label-text">Foto KTP</span>
            </div>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral text-neutral file:text-neutral-content cursor-pointer" accept="image/jpg,.pdf" {...getInputProps()} style={{display: 'block'}}
                onChange={(x) => setFile(x)}
            />
            <div className="label">
                <span className="label-text">klik atau jatuhkan disini</span>
                <span className="label-text-alt">pdf dan jpg/jpeg</span>
            </div>
            {isDragActive && 
                <div className={`absolute top-0 bottom-0 right-0 left-0 ${isDragAccept && 'bg-neutral/75 text-neutral-content'} ${isDragReject && 'bg-error/75 text-error-content'} z-[2] text-xl p-4`}>
                    <div className={`border border-dashed ${isDragAccept && 'border-neutral-content'} ${isDragReject && 'border-error-content'} border-8 w-full h-full grid place-items-center`}>
                        {isDragAccept && <p>File diterima</p>}
                        {isDragReject && <p>Hanya menerima pdf dan jpg</p>}
                    </div>
                </div>
            }
        </div>
        <div className="w-full max-w-lg flex flex-col">
            {/* {files.map((file, i) => <img src={URL.createObjectURL(file)} alt="foto ktp pengguna" className="w-full" key={i}/>)} */}
        </div>
        {isloading ? <span className='btn btn-accent w-full max-w-md mt-4'>Loading</span> : <button className="btn btn-accent w-full max-w-md mt-4">Tambah</button>}
    </form>
}