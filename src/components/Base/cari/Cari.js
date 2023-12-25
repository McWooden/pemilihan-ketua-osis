import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import Alert from "../../Utils/Alert";
import AlertError from "../../Utils/AlertError";
import { useNavigate, useSearchParams } from "react-router-dom";
import DisplayUser from "./DisplayUser";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

export default function Cari() {
    const [user, setUser] = useState(null);
    const [fetchError, setFetchError] = useState("");
    const [fetchEmpety, setFetchEmpety] = useState(false);
    const [deleteError, setDeleteError] = useState('')

    const [searchKey, setSearchKey] = useState("");

    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    async function handleSearch(e) {
        e.preventDefault();
        searchParams.set("q", searchKey);
        setSearchParams(searchParams, { replace: true });
    }

    const fetchData = useCallback(async () => {
        setFetchError("");
        setFetchEmpety(false);
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("nik", searchParams.get("q"));
        if (error) return setFetchError(error.message);

        if (!data.length) setFetchEmpety(true);

        setUser(data[0]);
    }, [searchParams]);

    useEffect(() => {
        if (searchParams.get("q")) fetchData();
    }, [fetchData, searchParams]);

    function handleEdit() {
        navigate("/form?q=" + user.id);
    }

    async function handleDelete() {
        try {
            if (user.pathFileKtp) {
                const statusStorage = await supabase.storage.from('avatars').remove([user?.pathFileKtp]) // path file ktp itu sama kaya nik nya
                console.log(statusStorage);
            }
            const {status} = await supabase
            .from('users')
            .delete()
            .eq('id', user.id)
            console.log(status);

            if (status === 204) {
                searchParams.delete('q')
                setSearchParams(searchParams)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <form
                className="flex flex-col items-center gap-2 w-full"
                onSubmit={handleSearch}
            >
                <div className="border flex rounded-xl overflow-hidden focus:ring-sky-500 focus:ring-1 w-full max-w-xl">
                    <input
                        type="number"
                        placeholder="Ketik NIK disini"
                        className="input w-full border-none "
                        value={searchKey}
                        onChange={(x) => {
                            setSearchKey(x.target.value);
                            setFetchEmpety(false);
                        }}
                        min={0}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="btn grid place-items-center rounded-none border-none rounded-e-xl rounded-s-none"
                    >
                        <CiSearch className="text-xl" />
                    </button>
                </div>
                {fetchError && <AlertError text={fetchError} />}
                {fetchEmpety && searchParams.get("q") && (
                    <Alert
                        text={`Tidak ada NIK yang cocok dengan ${searchParams.get(
                            "q"
                        )}.`}
                        className="btn justify-start h-auto"
                        cb={() => setFetchEmpety(false)}
                    />
                )}
            </form>
            <DisplayUser data={user} />
            {deleteError && <AlertError text={deleteError} className="w-full max-w-xl" cb={() => setDeleteError('')}/>}
            {user && (
                <div className="flex gap-2 w-full max-w-xl">
                    <button className="btn btn-error flex items-center" onClick={() => document.getElementById("my_modal_2").showModal()}>
                        <FaRegTrashAlt />
                        Hapus data
                    </button>
                    <button className="btn btn-primary flex items-center flex-1" onClick={handleEdit}>
                        <FaRegEdit />
                        Edit
                    </button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hapus data!</h3>
                            <p className="py-4">
                                Apakah kamu yakin untuk menghapus semua data pengguna {user?.name}?
                            </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">close</button>
                                </form>
                                <button className="btn btn-error" onClick={handleDelete}>Hapus</button>
                            </div>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            )}
        </div>
    );
}
