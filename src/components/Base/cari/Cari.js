import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react"
import supabase from "../../../config/supabaseClient";
import Alert from "../../Utils/Alert";
import AlertError from "../../Utils/AlertError";
import { useSearchParams } from "react-router-dom";
import DisplayUser from "./DisplayUser";

export default function Cari() {
    const [fetchError, setFetchError] = useState('')
    const [user, setUser] = useState(null)
    const [fetchEmpety, setFetchEmpety] = useState(false)

    const [searchKey, setSearchKey] = useState('')

    let [searchParams, setSearchParams] = useSearchParams()

    async function handleSearch(e) {
        e.preventDefault()
        searchParams.set('q', searchKey)
        setSearchParams(searchParams, {replace: true})
    }

    const fetchData = useCallback(async () => {
        setFetchError('')
        setFetchEmpety(false)
        const { data, error } = await supabase.from("users").select("*").eq('nik', searchParams.get('q'))
        if (error) return setFetchError(error.message)

        if (!data.length) setFetchEmpety(true)

        setUser(data[0])
    }, [searchParams])

    useEffect(() => {
        if (searchParams.get('q')) fetchData()
    }, [fetchData, searchParams])

    return <div className="h-full flex flex-col gap-2 items-center">
     <form className="flex flex-col items-center gap-2 w-full" onSubmit={handleSearch}>
        <div className="border flex rounded-xl overflow-hidden focus:ring-sky-500 focus:ring-1 w-full max-w-xl">
            <input type="number" placeholder="Ketik NIK disini" className="input w-full border-none " value={searchKey} onChange={x => {
                setSearchKey(x.target.value)
                setFetchEmpety(false)
            }} min={0} autoFocus/>
            <button type="submit" className="btn grid place-items-center rounded-none border-none rounded-e-xl rounded-s-none">
                <CiSearch className="text-xl"/>
            </button>
        </div>
        {fetchError && <AlertError text={fetchError}/>}
        {(fetchEmpety && searchParams.get('q')) && <Alert text={`Tidak ada NIK yang cocok dengan ${searchParams.get('q')}.`} className="btn justify-start h-auto" cb={() => setFetchEmpety(false)}/>}
    </form>
    <DisplayUser data={user}/>
    </div>
}


