import { CiSearch } from "react-icons/ci";
import { useState } from "react"


export default function Cari() {
    const [searchKey, setSearchKey] = useState('')
    function handleSubmit(e) {
        e.preventDefault()
        console.log(searchKey);
    }
    return <div className="h-full flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
            <div className="border flex rounded-xl overflow-hidden focus:ring-sky-500 focus:ring-1">
                <input type="number" placeholder="Ketik NIK disini" className="input w-full border-none " value={searchKey} onChange={x => setSearchKey(x.target.value)} min={0}/>
                <button type="submit" className="btn grid place-items-center rounded-none border-none rounded-e-xl rounded-s-none">
                    <CiSearch className="text-xl"/>
                </button>
            </div>
        </form>
    </div>
}