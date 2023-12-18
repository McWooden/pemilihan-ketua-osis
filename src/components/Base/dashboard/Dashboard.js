import Hero from "./Hero"
import Stat from "./Stat"

export default function Dashboard() {

    return <div className="h-full flex flex-col gap-2 min-h-[2000px]">
        <Hero/>
        <Stat/>
    </div>
}