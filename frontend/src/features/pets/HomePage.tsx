import '../../App.css'
import {PetList} from "./PetList.tsx";

function HomePage() {

    return (
        <div className={"h-full w-full"}>
            <div className={"text-5xl m-4"}>Pawfect Match</div>
            <div className={"mb-4"}>
                <PetList adoptionStatus={"available"}/>
            </div>

            <div>
                <PetList adoptionStatus={"adopted"}/>
            </div>
        </div>
    )
}

export default HomePage
