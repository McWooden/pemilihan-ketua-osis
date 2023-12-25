import { useCallback, useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import SearchAndPlusButton from "../../Utils/SearchAndPlusButton";
import supabase from "../../../config/supabaseClient";
import { setUsers } from "../../../redux/source";
import AlertError from "../../Utils/AlertError";
import TableData from "./TableData";
import { HiRefresh } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiMicrosoftExcelLogo } from "react-icons/pi";
import { formatDate } from "../../../utils";
import xlsx from "json-as-xlsx";

export default function Rekap() {
    const [isLoading, setIsLoading] = useState(false)
    const users = useSelector(state => state.source.users)
    const [fetchError, setFetchError] = useState(false)
    const dispatch = useDispatch()

    const fetchUsers = useCallback(async () => {
        setIsLoading(true)
        setFetchError(false)
        const {data, error} = await supabase.from('users').select('*')
        if (error) {
            setFetchError(true)
            setIsLoading(false)
            return
        }
        if (data) {
            dispatch(setUsers(data))
            setIsLoading(false)
        }
    },[dispatch])

    useEffect(() => {
        fetchUsers()
    },[fetchUsers])

    function handleDownload() {
        const columns = [
            { label: "id", value: "id" },
            { label: "nik", value: (row) => row.nik },
            { label: "nama", value: "nama" },
            { label: "tempatLahir", value: "tempatLahir" },
            { label: "tanggalLahir", value: (row) => formatDate(row.tanggalLahir)},
            { label: "jenisKelamin", value: "jenisKelamin" },
            { label: "golonganDarah", value: "golonganDarah" },
            { label: "alamat", value: "alamat" },
            { label: "rt", value: "rt" },
            { label: "rw", value: "rw" },
            { label: "kelurahanDesa", value: "kelurahanDesa" },
            { label: "kecamatan", value: "kecamatan" },
            { label: "agama", value: "agama" },
            { label: "statusPerkawinan", value: "statusPerkawinan" },
            { label: "pekerjaan", value: "pekerjaan" },
            { label: "kewarganegaraan", value: "kewarganegaraan" },
            { label: "berlakuHingga", value: (row) => formatDate(row.berlakuHingga) },
            { label: "pathFileKtp", value: "pathFileKtp" },
            { label: "typeFileKtp", value: "typeFileKtp" }
        ];
        
        const data = [{
            sheet: 'pengguna',
            columns,
            content: users
        }]

        let settings = {
            fileName: `Rekap-data-pemilih-${+new Date()}`,
            extraLength: 3,
        }
        xlsx(data, settings)
    }
    

    return  <div className="flex flex-col h-full gap-2">
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <FaRegAddressCard className="text-5xl"/>
                </div>
                <div className="stat-title">Total Ktp</div>
                <div className="stat-value text-primary">
                    {users && users.length}
                    {fetchError && <span className="bg-error px-2">Err</span>}
                </div>
                <div className="stat-desc flex gap-2">
                    <button className="btn btn-outline btn-primary flex items-center gap-2" onClick={fetchUsers}>
                        {isLoading ? <AiOutlineLoading3Quarters className='text-2xl animate-spin'/> : <HiRefresh className='text-2xl'/>}
                        Segarkan
                    </button>
                    <button className="btn btn-outline btn-primary flex items-center gap-2" onClick={handleDownload}>
                        <PiMicrosoftExcelLogo className="text-2xl"/>
                        Download
                    </button>
                </div>
            </div>
        </div>
        <SearchAndPlusButton/>
        {fetchError && <AlertError text="Kesalahan!, gagal mendapatkan data, klik untuk menyegarkan" className="btn bg-error justify-start h-auto" cb={fetchUsers}/>}
        <TableData users={users} className={'flex-1'}/>
    </div>
}