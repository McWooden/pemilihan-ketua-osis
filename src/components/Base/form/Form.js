export default function Form() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log('bjr');
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-2 items-center py-4">
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">Nomor Induk Kependudukan</span>
                </div>
                <input
                    type="number"
                    placeholder="Ketik 16 digit disini"
                    className="input input-bordered w-full"
                    max={16} min={16}
                />
            </label>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">Nama</span>
                </div>
                <input
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
                    <select className="select select-bordered" defaultValue='-'>
                        <option disabled value='-'>Pilih satu</option>
                        <option value='Laki-laki'>Laki-laki</option>
                        <option value='Perempuan'>Perempuan</option>
                    </select>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Gol Darah</span>
                    </div>
                    <select className="select select-bordered" defaultValue='-'>
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
                <select className="select select-bordered" defaultValue='-'>
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
                    <span className="label-text">Pekerjaan</span>
                </div>
                <input
                    type="text"
                    placeholder="Ketik disini"
                    className="input input-bordered w-full"
                />
            </label>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">Kewarganegaraan</span>
                </div>
                <select className="select select-bordered" defaultValue='-'>
                    <option disabled value='-'>Pilih satu</option>
                    <option value='Islam<'>WNI</option>
                    <option value='Kristen'>WNA</option>
                    <option value='Katolik'>ITAP</option>
                </select>
            </label>
            <label className="form-control w-full max-w-lg">
                <div className="label">
                    <span className="label-text">Foto KTP</span>
                </div>
                <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral text-neutral file:text-neutral-content"/>
            </label>
            <button className="btn btn-accent w-full max-w-md mt-4">Tambah</button>
        </form>
    );
}
