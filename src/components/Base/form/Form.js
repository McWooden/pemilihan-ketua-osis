import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import supabase from "../../../config/supabaseClient"
import AlertError from "../../Utils/AlertError"
import { useDispatch, useSelector } from "react-redux"
import { setAdmins } from "../../../redux/source"
import { MdRefresh } from "react-icons/md"
import { useSearchParams } from "react-router-dom"
import Alert from "../../Utils/Alert"
import TableData from "../rekap/TableData"
import { bucketUrl, dateFormat } from "../../../utils"
import { FaRegTrashAlt } from "react-icons/fa"

// fitur edit
export default function Form() {
    // admins variable
    const admins = useSelector(state => state.source.admins)
    const [fetchAdminsError, setFetchAdminsError] = useState(false)
    // handling fetch
    const [isloading, setIsLoading] = useState(false)
    const [errorFileUpload, setErrorFileUpload] = useState(false)
    const [errorInsertRow, setErrorInsertRow] = useState(false)
    // handle query
    const [user, setUser] = useState(null)
    const [fetchError, setFetchError] = useState('')
    const [fetchEmpety, setFetchEmpety] = useState(false)
    // handle data submit
    const [isSomeFieldDefault, setIsSomeFieldDefault] = useState('')

    // field variable
    const [nik, setNik] = useState('')
    const [nama, setNama] = useState('')
    const [tempatLahir, setTempatLahir] = useState('')
    const [tanggalLahir, setTanggalLahir] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('-')
    const [golonganDarah, setGolonganDarah] = useState('-')
    const [alamat, setAlamat] = useState('')
    const [rt, setRt] = useState(0)
    const [rw, setRw] = useState(0)
    const [kelurahanDesa, setKelurahanDesa] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [agama, setAgama] = useState('-')
    const [statusPerkawinan, setStatusPerkawinan] = useState('-')
    const [pekerjaan, setPekerjaan] = useState('')
    const [kewarganegaraan, setKewarganegaraan] = useState('-')
    const [berlakuHingga, setBerlakuHingga] = useState('')
    const [file, setFile] = useState(null)
    const [typeFileKtp, setTypeFileKtp] = useState('image')
    const [pengelolaId, setPengelolaId] = useState('-')
    const onDrop = useCallback(acceptFiles => {
        setFile(acceptFiles[0])
    }, [])

    useEffect(() => {
        console.log('file', file);
    },[file])

    // define hook
    let [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useDispatch()

    // field user
    function setFieldToUser(user) {
        setNik(user?.nik || '')
        setNama(user?.nama || '')
        setTempatLahir(user?.tempatLahir || '')
        setTanggalLahir(user?.tanggalLahir ? dateFormat(user.tanggalLahir) : '')
        setJenisKelamin(user?.jenisKelamin || '-')
        setGolonganDarah(user?.golonganDarah || '-')
        setAlamat(user?.alamat || '')
        setRt(user?.rt || 0)
        setRw(user?.rw || 0)
        setKelurahanDesa(user?.kelurahanDesa || '')
        setKecamatan(user?.kecamatan || '')
        setAgama(user?.agama || '-')
        setStatusPerkawinan(user?.statusPerkawinan || '-')
        setPekerjaan(user?.pekerjaan || '')
        setKewarganegaraan(user?.kewarganegaraan || '-')
        setBerlakuHingga(user?.tanggalLahir ? dateFormat(user.berlakuHingga) : '')
        setTypeFileKtp(user?.typeFileKtp || 'image')
        setPengelolaId(user?.pengelolaId || '-')
    }
    // fetch data
    const fetchData = useCallback(async () => {
        setFetchError('')
        setFetchEmpety(false)
        const { data, error } = await supabase.from("users").select("*").eq('id', searchParams.get('q'))
        if (error) return setFetchError(error.message)

        if (!data.length) setFetchEmpety(true)
        setUser(data[0])
        setFieldToUser(data[0])
    }, [searchParams])

    // fetch when there a query
    useEffect(() => {
        if (searchParams.get('q') && !user) fetchData()
    }, [fetchData, searchParams, user])

    const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'application/pdf': ['.pdf']
        },
    })

    function resetAllField() {
        setNik('')
        setNama('')
        setTempatLahir('')
        setTanggalLahir('')
        setJenisKelamin('-')
        setGolonganDarah('-')
        setAlamat('')
        setRt(0)
        setRw(0)
        setKelurahanDesa('')
        setKecamatan('')
        setAgama('-')
        setStatusPerkawinan('-')
        setPekerjaan('')
        setKewarganegaraan('-')
        setBerlakuHingga('')
        setFile(null)
        setTypeFileKtp('image')
    }

    function findDefaultValue() {
        let text = ''

        if (nik === '') text += 'nik '
        if (nama === '') text += 'nama '
        if (tempatLahir === '') text += 'tempatLahir '
        if (tanggalLahir === '') text += 'tanggalLahir '
        if (jenisKelamin === '-') text += 'jenisKelamin '
        if (golonganDarah === '-') text += 'golonganDarah '
        if (alamat === '') text += 'alamat '
        if (rt === 0) text += 'rt '
        if (rw === 0) text += 'rw '
        if (kelurahanDesa === '') text += 'kelurahanDesa '
        if (kecamatan === '') text += 'kecamatan '
        if (agama === '-') text += 'agama '
        if (statusPerkawinan === '-') text += 'statusPerkawinan '
        if (pekerjaan === '') text += 'pekerjaan '
        if (kewarganegaraan === '-') text += 'kewarganegaraan '
        if (berlakuHingga === '') text += 'berlakuHingga '
        if (file === null) text += 'fotoKtp '
        if (pengelolaId === '-') text += 'pengelolaId '

        return text
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const isDefaultValueHere = findDefaultValue()

        
        if (isDefaultValueHere) {
            setIsSomeFieldDefault(isDefaultValueHere)
            return document.getElementById('modalFieldDefault').showModal()
        }
        
        submitTheForm()
    }

    async function submitTheForm() {
        setIsLoading(true)
        setErrorFileUpload(false)
        setErrorInsertRow(false)
        document.getElementById('modalFieldDefault').close()
        setIsSomeFieldDefault('')
        let dataToSend = {
            nik, nama,
            tempatLahir, tanggalLahir: tanggalLahir ? tanggalLahir : null,
            jenisKelamin, golonganDarah,
            alamat, rt, rw, kelurahanDesa, kecamatan,
            agama, statusPerkawinan, pekerjaan, kewarganegaraan,
            pathFileKtp: '', typeFileKtp, berlakuHingga: berlakuHingga ? berlakuHingga : null , pengelolaId: pengelolaId === '-' ? null : pengelolaId
        }
        try {
            try {
                if (file) {
                    let fileUploadStatus = await supabase.storage.from('fotoKtp').upload(nik + '-' + +new Date(), file)
                    if (fileUploadStatus.error) {
                        setErrorFileUpload(fileUploadStatus.error.message)
                        console.log('file status',fileUploadStatus);
                        throw new Error(fileUploadStatus.error.message)
                    }
                    dataToSend.pathFileKtp = fileUploadStatus.data.path
                }
            } catch (error) {
                console.log('file', error);
            }

            try {
                let rowStatus
                if (user) {
                    rowStatus = await supabase.from('users')
                    .update(dataToSend)
                    .eq('id', user.id)
                    .select()
                } else {
                    rowStatus = await supabase.from('users').insert([dataToSend]).select()
                }
                if (rowStatus.error) {
                    console.log('row status', rowStatus)
                    setErrorInsertRow(rowStatus.error.message)
                    throw new Error(rowStatus.error.message)
                }
            } catch (error) {
                console.log('table error', error);
            }
            setIsLoading(false)
            searchParams.delete('q')
            setSearchParams(searchParams)
            setUser(null)
            resetAllField()
        } catch (error) {
            console.log(error);
            return setIsLoading(false)
        }
    }

    const fetchAdmins = useCallback(async () => {
        setFetchAdminsError(false)
        const { data, error } = await supabase.from("admins").select("id, username")
        
        if (error) return setFetchAdminsError(true)

        dispatch(setAdmins(data))
    }, [dispatch])

    useEffect(() => {
        if (!admins) fetchAdmins()
    },[admins, fetchAdmins])

    async function handleDeleteFileKtp() {
        try {
            const statusStorage = await supabase.storage.from('avatars').remove([user?.pathFileKtp]) // path file ktp itu sama kaya nik nya
            if (statusStorage.error) throw new Error(statusStorage.error)
            const statusTable = await supabase.storage.from('users').update({pathFileKtp: null}).eq('id', user?.id).select() 
            console.log(statusTable);
            if (statusTable.error) throw new Error(statusStorage.error)
            document.getElementById('modalDelete').close()
        } catch (error) {
            console.log(error)
        }
    }

    function handleCancelEdit() {
        setUser(null)
        resetAllField()
        searchParams.delete('q')
        setSearchParams(searchParams)
    }

    return <div className="flex flex-col gap-2 items-center">
        {searchParams.get('q') && <>
            {fetchError && <AlertError text={fetchError}/>}
            {(fetchEmpety && searchParams.get('q')) && <Alert text={`Tidak ada ID yang cocok dengan ${searchParams.get('q')}.`} className="btn justify-start h-auto" cb={() => {
                searchParams.delete('q')
                setSearchParams(searchParams)
                setFetchEmpety(false)
            }}/>}
            {user && <div className="w-full max-w-lg">
                <TableData users={[user]} className="flex-1"/>
            </div>
            }
        </>}
        {errorFileUpload && <AlertError text={`File: ${errorFileUpload}`}/>}
        {errorInsertRow && <AlertError text={`Insert data: ${errorInsertRow}`} />}
        <form className="flex flex-col gap-2 py-4 w-full flex-1 max-w-lg items-center" onSubmit={handleSubmit}>
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
                    <option value='Islam'>WNI</option>
                    <option value='Kristen'>WNA</option>
                    <option value='Katolik'>ITAP</option>
                </select>
            </label>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">Berlaku Hingga</span>
                </div>
                <input
                    value={berlakuHingga}
                    onChange={(e) => setBerlakuHingga(e.target.value)}
                    type="date"
                    className="input input-bordered w-full"
                />
            </label>
            {user && user.pathFileKtp ? <div className="p-2 pb-4 rounded shadow bg-base-200 flex flex-col gap-2 w-full max-w-lg">
                    {user.typeFileKtp === 'image' && <img src={bucketUrl + user.pathFileKtp} alt="foto ktp pengguna" className={`w-full ${file && 'blur-sm'}`}/>}
                    {user.typeFileKtp === 'document' && <iframe src={bucketUrl + user.pathFileKtp} width="100%" title="user pdf" className={`${file && 'blur-sm'}`}/>}
                    <div className="flex gap-2">
                        {file && <span className="bg-error p-2 rounded-xl flex items-center">File ini harus dihapus dahulu sebelum file baru di upload!</span>}
                        <span className="btn btn-error w-fit ml-auto" onClick={()=>document.getElementById('modalDelete').showModal()}><FaRegTrashAlt /></span>
                    </div>
                </div>
                :
                <>
                <div className="flex gap-2 max-w-lg w-full max-w-lg sm:flex-row flex-col">
                    <div className="w-full max-w-lg relative" {...getRootProps()}>
                        <div className="label">
                            <span className="label-text">Foto KTP</span>
                        </div>
                        <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral text-neutral file:text-neutral-content cursor-pointer" accept="image/jpg,.pdf" {...getInputProps()} style={{display: 'block'}}
                            onChange={(x) => {
                                onDrop(x.target.files)
                            }}
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
                    <label className="form-control w-full max-w-lg">
                        <div className="label">
                            <span className="label-text">Tipe File</span>
                        </div>
                        <select className="select select-bordered" value={typeFileKtp} onChange={(e) => setTypeFileKtp(e.target.value)}>
                            <option value='image'>image/jpeg,jpg</option>
                            <option value='document'>application/pdf</option>
                        </select>
                    </label>
                </div>
                <div className="w-full max-w-lg flex flex-col gap-2">
                    {file && <>
                        {typeFileKtp === 'image' && <img src={URL.createObjectURL(file)} alt="foto ktp pengguna" className="w-full"/>}
                        {typeFileKtp === 'document' && <iframe src={URL.createObjectURL(file)} width="100%" title="user pdf"/>}
                    </>}
                    {file?.name} {typeFileKtp}
                </div>
            </>
            }
            <div className="flex w-full max-w-lg gap-2 items-center">
                <label className="form-control w-full max-w-lg">
                    <div className="label">
                        <span className="label-text">Tambahkan pengelola</span>
                    </div>
                    <select className="select select-bordered" value={pengelolaId} onChange={(e) => setPengelolaId(e.target.value)}>
                        <option disabled value='-'>Pilih satu</option>
                        {admins?.map(admin => <option key={admin.id} value={admin.id}>{admin.username}</option>) || ''}
                    </select>
                </label>
                {fetchAdminsError && <div className="btn btn-primary text-primary-content text-xl tooltip grid place-items-center" data-tip="Segarkan" onClick={fetchAdmins}><MdRefresh/></div>}
            </div>
            <div className="flex gap-2 max-w-md w-full  mt-4">
                {user && <span className={`btn btn-secondary`} onClick={handleCancelEdit}>Batalkan</span>} 
                {isloading ? <span className={`btn ${user ? 'btn-primary' : 'btn-accent'} flex-1`}>Loading</span> : <button className={`btn ${user ? 'btn-primary' : 'btn-accent'} flex-1`}>{user? 'Simpan' : 'Tambah'}</button>}
            </div>
        </form>
        <dialog id="modalDelete" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Buang Gambar Lama</h3>
                <p className="py-4">File akan dihapus dan data terkait akan diperbarui setelahnya sekarang?</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Tutup</button>
                    </form>
                    <button className="btn btn-error" onClick={handleDeleteFileKtp}>Lanjutkan</button>
                </div>
            </div>
        </dialog>
        <dialog id="modalFieldDefault" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Field kosong</h3>
                <p className="py-4">Kamu belum menyelesaikan {isSomeFieldDefault}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Tutup</button>
                    </form>
                    <button className="btn btn-accent" onClick={submitTheForm}>Lanjutkan</button>
                </div>
            </div>
        </dialog>
    </div>
}