import type {AdoptionStatus} from "../../types";
import {useAppSelector} from "../../app/hooks.ts";
import {PetCard} from "./PetCard.tsx";

export const PetList = ({adoptionStatus}: { adoptionStatus: AdoptionStatus }) => {
    const petsWithStatus = useAppSelector(state => state.pets.items.filter((pet) => pet.status === adoptionStatus));
    const status = useAppSelector(state => state.pets.status)
    const error = useAppSelector(state => state.pets.error)

    const upperCaseFirstLetter = (adoptionStatus: AdoptionStatus) => {
        return adoptionStatus.substring(0, 1).toUpperCase() + adoptionStatus.substring(1)
    }

    if (status === 'loading') {
        return <div className={"text-lg"}>Loading pets...</div>
    }

    if (status === 'failed') {
        return <div className={"text-lg text-red-500"}>Error: {error}</div>
    }
    return (
        petsWithStatus.length === 0 ?
            <div className={"text-lg"}>There are no available pets with {adoptionStatus} status</div>
            :
            <>
                <div className={"text-xl"}>{upperCaseFirstLetter(adoptionStatus)} Pets</div>
                <div className={"flex flex-row overflow-y-auto max-h-96 max-w-300"}>
                    {petsWithStatus.map((pet) => {
                        return <PetCard id={pet.id} name={pet.name} description={pet.description}
                                        age={pet.age}/>
                    })}
                </div>
            </>

    )
}
