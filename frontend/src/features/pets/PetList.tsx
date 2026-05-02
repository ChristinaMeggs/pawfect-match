import type {AdoptionStatus} from "../../types";
import {useAppSelector} from "../../app/hooks.ts";
import {PetCard} from "./PetCard.tsx";

export const PetList = ({adoptionStatus}: { adoptionStatus: AdoptionStatus }) => {
    const availablePets = useAppSelector(state => state.pets.items.filter((pet) => pet.status === adoptionStatus));


    const upperCaseFirstLetter = (adoptionStatus: AdoptionStatus) => {
        return adoptionStatus.substring(0, 1).toUpperCase() + adoptionStatus.substring(1)
    }
    return (
        availablePets.length === 0 ?
            <div className={"text-lg"}>There are no available pets with {adoptionStatus} status</div>
            :
            <>
                <div className={"text-xl"}>{upperCaseFirstLetter(adoptionStatus)} Pets</div>
                <div className={"flex flex-row overflow-y-auto max-h-96 max-w-300"}>
                    {availablePets.map((pet) => {
                        return <PetCard id={pet.id} name={pet.name} description={pet.description}
                                        age={pet.age}/>
                    })}
                </div>
            </>

    )
}
