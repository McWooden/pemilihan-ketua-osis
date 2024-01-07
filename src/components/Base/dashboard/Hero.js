import SearchAndPlusButton from "../../Utils/SearchAndPlusButton";

export default function Hero() {
    return <div className="hero bg-base-200 rounded-lg py-4">
        <div className="hero-content text-center z-auto">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold">DAPIL</h1>
                <p className="py-6">MAGELANG TENGAH - 4. IRNA</p>
                <SearchAndPlusButton className={'max-2-md'}/>
            </div>
        </div>
    </div>
}