import Hero from "./Hero"
import Stat from "./Stat"

export default function Dashboard() {

    return <div className="h-full flex flex-col gap-2">
        <Hero/>
        <Stat/>
    </div>
}