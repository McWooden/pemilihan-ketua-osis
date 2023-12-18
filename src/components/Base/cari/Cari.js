import { useState } from "react"


export default function Cari() {
    const [searchKey, setSearchKey] = useState('')
    return <div className="h-full flex flex-col gap-2">
        <input type="number" placeholder="Ketik NIK disini" className="input input-bordered w-full" value={searchKey} onChange={x => setSearchKey(x.target.value)} min={0}/>
    </div>
}